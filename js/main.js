//Developed By: Isaac Robbins
//For Use With: HSE Schedule App

//const googleSheetURL = "https://docs.google.com/spreadsheets/d/1QBUjDIa7H-UhTKOe7znd2h9XYn1uDeuZrXzuR0C7KYk/gviz/tq?sheet=";

const globalTime = new DateTime();
const scheduless = new Schedules(globalTime.getDate().monthName);
const monthlyRawData = new Sheet(googleSheetURL);
var monthlyLayout = undefined;
var schedulesRequired = undefined;
var currentSchedule = undefined;
var personalSchedule = undefined;
var periodTimeLeft = undefined;
var periodHeader = undefined;
var periodShowLower = undefined;
var showLunch = undefined;

preupdate();

async function preupdate(){
  await loadGoogleCharts();
  if(localStorage.schedules != undefined){
    await refreshSchedules();
    console.log(scheduless);
  } else {

  }
  update();
}

function update(){
  globalTime.update();
  currentSchedule = schedulesRequired[monthlyLayout[globalTime.getDate().dayOfMonth - 1]].clone();
  personalSchedule = schedulesRequired[monthlyLayout[globalTime.getDate().dayOfMonth - 1]].clone();
  personalizeSchedule();
  setCurrentPeriod(currentSchedule);
  setCurrentPeriod(personalSchedule);
  periodHeader = getPeriodHeader();
  periodTimeLeft = getPeriodTimeLeft();
  updateDisplays();
  window.requestAnimationFrame(update);
}

async function refreshSchedules(){
  await monthlyRawData.getRawData();
  await scheduless.setSchedules(googleSheetURL, monthlyRawData.rawData);
  monthlyLayout = scheduless.getScheduleLayout();
  schedulesRequired = scheduless.getRequiredSchedules();
}

function personalizeSchedule(){
  var lunchIndexes = [];
  for(var p = 0; p < personalSchedule.layout.length; p++){
    if(personalSchedule.layout[p].isLunch){
      lunchIndexes.push(p);
    }
  }
  if(lunchIndexes.length > 0){
    for(var l = 0; l < lunchIndexes.length; l++){
      if(personalSchedule.layout[lunchIndexes[l]].lunchName != undefined && personalSchedule.layout[lunchIndexes[l]].lunchName.contains(localStorage.selectedLunch)){
        switch(l){
          case 0:
            var me = personalSchedule.layout[lunchIndexes[0]];
            var middle = personalSchedule.layout[lunchIndexes[1]];
            var end = personalSchedule.layout[lunchIndexes[2]];
            me.setDisplayName(me.lunchName);
            middle.setDisplayName(me.notLunchName);
            middle.setTimes(middle.startTime.getTimeAsString(), end.endTime.getTimeAsString());
            personalSchedule.layout.splice(lunchIndexes[2], 1);
            personalSchedule.lunchPeriod = lunchIndexes[0];
            break;
          case 1:
            var start = personalSchedule.layout[lunchIndexes[0]];
            var me = personalSchedule.layout[lunchIndexes[1]];
            var end = personalSchedule.layout[lunchIndexes[2]];
            me.setDisplayName(me.lunchName);
            start.setDisplayName(start.notLunchName);
            end.setDisplayName(end.notLunchName);
            personalSchedule.lunchPeriod = lunchIndexes[1];
            break;
          case 2:
            var start = personalSchedule.layout[lunchIndexes[0]];
            var middle = personalSchedule.layout[lunchIndexes[1]];
            var me = personalSchedule.layout[lunchIndexes[2]];
            me.setDisplayName(me.lunchName);
            start.setDisplayName(start.notLunchName);
            start.setTimes(start.startTime.getTimeAsString(), middle.endTime.getTimeAsString());
            personalSchedule.layout.splice(lunchIndexes[1], 1);
            personalSchedule.lunchPeriod = lunchIndexes[2] - 1;
            break;
        }
      }
    }
  }
}

function setCurrentPeriod(schedule){
  if(globalTime.getTimeInSeconds() < schedule.schoolStartTime.getTimeInSeconds()){
    schedule.currentPeriod = "Before School";
    return;
  }
  if(globalTime.getTimeInSeconds() > schedule.schoolEndTime.getTimeInSeconds()){
    schedule.currentPeriod = "After School";
    return;
  }
  for(var p = 0; p < schedule.layout.length; p++){
    if(globalTime.isBetween(schedule.layout[p].startTime, schedule.layout[p].endTime)){
      schedule.currentPeriod = p;
      return;
    }
  }
}

function getPeriodHeader(){
  if(personalSchedule.currentPeriod == "Before School"){
    periodShowLower = false;
    showLunch = false;
    return "School Starts In";
  } else if(personalSchedule.currentPeriod == "After School"){
    periodShowLower = false;
    showLunch = false;
    return "School Has Ended";
  } else {
    periodShowLower = true;
    showLunch = true;
    return personalSchedule.layout[personalSchedule.currentPeriod].displayName;
  }
}

function getPeriodTimeLeft(){
  if(personalSchedule.currentPeriod == "Before School"){
    return formatTimeLeft(globalTime.getTimeUntil(personalSchedule.schoolStartTime));
  } else if(personalSchedule.currentPeriod == "After School"){
    return "No Time Available";
  } else {
    return formatTimeLeft(globalTime.getTimeUntil(personalSchedule.layout[personalSchedule.currentPeriod].endTime));
  }
}

function formatTimeLeft(obj){
  var string = "";
  if(obj.hour != 0){
    string += obj.hour + ":";
    if(obj.minute < 10){
      string += "0";
    }
  }
  string += obj.minute + ":";
  if(obj.second < 10){
    string += "0" + obj.second;
  } else {
    string += obj.second;
  }
  return string;
}

function updateDisplays(){
  document.getElementById("currentDayText").textContent = globalTime.getDate().dayName;
  document.getElementById("currentWeekText").textContent = globalTime.getDateAsString();
  document.getElementById("currentTimeText").textContent = globalTime.getTimeAsString();
  document.getElementById("timeHeader").textContent = periodHeader;
  if(periodShowLower && personalSchedule.layout[personalSchedule.currentPeriod].lowerDisplayName != false){
    document.getElementById("timeSecondaryHeader").textContent = personalSchedule.layout[personalSchedule.currentPeriod].lowerDisplayName;
    document.getElementById("timeSecondaryHeader").style.display = "block";
  } else {
    document.getElementById("timeSecondaryHeader").style.display = "none";
  }
  document.getElementById("timeText").textContent = periodTimeLeft;
  if(showLunch && globalTime.getTimeInSeconds() < personalSchedule.layout[personalSchedule.lunchPeriod].startTime.getTimeInSeconds()){
    document.getElementById("lunchText").textContent = personalSchedule.layout[personalSchedule.lunchPeriod].lunchName;
    document.getElementById("lunchTime").textContent = formatTimeLeft(globalTime.getTimeUntil(personalSchedule.layout[personalSchedule.lunchPeriod].startTime));
    document.getElementById("lunch").style.display = "table-cell";
  } else {
    document.getElementById("lunch").style.display = "none";
  }
}
