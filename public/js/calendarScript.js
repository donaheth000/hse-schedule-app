function generateCalendar(ms) {
  var calendarDayToPrint = 1;
  deleteCalendar();
  document.getElementById("cal-month").innerHTML = moment().format("MMMM") + "<br>" + moment().format("YYYY");
  for (var w = 0; w < 5; w++) {
    for (var d = 0; d < 7; d++) {
      var wk = document.getElementById("cal-week-" + (w + 1));
      var dy = document.createElement("td");
      dy.setAttribute("class", "cal-days");
      if ((w == 0 && d < moment().startOf("month").day()) || calendarDayToPrint > ms.length) {
        dy.innerHTML = "";
        dy.setAttribute("class", "calendarOtherMonth");

      } else {
        dy.innerHTML = calendarDayToPrint;
        dy.setAttribute("onclick", "displaySelectedSchedule(" + (calendarDayToPrint - 1) + ")");
        if(ms[calendarDayToPrint - 1].metadata.type != "school day") {
          dy.setAttribute("class", "calendarNoSchool");
        }
        if(ms[calendarDayToPrint-1].metadata.dayColor == "red"){
            dy.style.color = "red";
        } else if (ms[calendarDayToPrint-1].metadata.dayColor == "blue"){
            dy.style.color = "blue";
        }
        // moment().date()
        if(calendarDayToPrint == moment().date()) {
          if(ms[calendarDayToPrint-1].metadata.dayColor == "red"){
            dy.setAttribute("class", "calendarRedDay");
          } else if (ms[calendarDayToPrint-1].metadata.dayColor == "blue"){
            dy.setAttribute("class", "calendarBlueDay");
          } else {
            dy.setAttribute("class", "calendarCurrentDay");
          }

        }
        console.log(ms[calendarDayToPrint-1].metadata.dayColor);


        calendarDayToPrint++;
      }
      wk.appendChild(dy);
    }
  }
  createScheduleTable(monthlySchedule[moment().date()-1]);
}

function deleteCalendar() {
  for (var w = 0; w < 6; w++) {
    var wk = document.getElementById("cal-week-" + (w + 1));
    for (var d = 0; d < 7; d++) {
      try {
        wk.children[0].remove();
      } catch {

      }
    }
  }
  calendarDayToPrint = 1;
}

function displaySelectedSchedule(day){
  createScheduleTable(monthlySchedule[day]);
  display(1);
}
