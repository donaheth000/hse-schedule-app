//Developed By: Isaac Robbins
//Last Update: 11/7/2019
//For Use With: HSE Schedule App

var ScriptPlus = {
	config:{
		debug:false,
		version:"1.1.0"
	}
}

var TimePlus = {
	days:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	months:["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	timeTracker:true,
	getCurrentTime:function(){
			var d = new Date();
			return {
				hour:d.getHours(),
				minute:d.getMinutes(),
				second:d.getSeconds(),
				millisecond:d.getMilliseconds()
			};
		},
	getCurrentDate:function(){
			var d = new Date();
			return {
				year:d.getFullYear(),
				month:d.getMonth(),
				weekOfYear:d.getWeek(),
				dayOfWeek:d.getDay(),
				monthName:TimePlus.months[d.getMonth()],
				dayName:TimePlus.days[d.getDay()]
			};
		},
	addMilliseconds:function(t1, t2){
			if(typeof(t1) == "string"){
				t1 = parseInt(t1);
			}
			if(typeof(t2) == "string"){
				t2 = parseInt(t2);
			}
			if(typeof(t1) != "number" || isNaN(t1)){
				scriptPlusGiveErrorMessage("Could Not Determine Number");
				return;
			}
			if(typeof(t2) != "number" || isNaN(t2)){
				scriptPlusGiveErrorMessage("Could Not Determine Number");
				return;
			}
			var t = t1 + t2;
			while(t >= 1000){
				t -= 1000;
			}
			return t;
		},
	addSeconds:function(t1, t2){
			if(typeof(t1) == "string"){
				t1 = parseInt(t1);
			}
			if(typeof(t2) == "string"){
				t2 = parseInt(t2);
			}
			if(typeof(t1) != "number" || isNaN(t1)){
				scriptPlusGiveErrorMessage("Could Not Determine Number");
				return;
			}
			if(typeof(t2) != "number" || isNaN(t2)){
				scriptPlusGiveErrorMessage("Could Not Determine Number");
				return;
			}
			var t = t1 + t2;
			while(t >= 60){
				t -= 60;
			}
			return t;
		},
	addMinutes:function(t1, t2){
			if(typeof(t1) == "string"){
				t1 = parseInt(t1);
			}
			if(typeof(t2) == "string"){
				t2 = parseInt(t2);
			}
			if(typeof(t1) != "number" || isNaN(t1)){
				scriptPlusGiveErrorMessage("Could Not Determine Number");
				return;
			}
			if(typeof(t2) != "number" || isNaN(t2)){
				scriptPlusGiveErrorMessage("Could Not Determine Number");
				return;
			}
			var t = t1 + t2;
			while(t >= 60){
				t -= 60;
			}
			return t;
		},
	addHours:function(t1, t2){
			if(typeof(t1) == "string"){
				t1 = parseInt(t1);
			}
			if(typeof(t2) == "string"){
				t2 = parseInt(t2);
			}
			if(typeof(t1) != "number" || isNaN(t1)){
				scriptPlusGiveErrorMessage("Could Not Determine Number");
				return;
			}
			if(typeof(t2) != "number" || isNaN(t2)){
				scriptPlusGiveErrorMessage("Could Not Determine Number");
				return;
			}
			var t = t1 + t2;
			while(t >= 24){
				t -= 24;
			}
			return t;
		},
	addDays:function(d1, d2){
			if(typeof(d1) == "string"){
				d1 = TimePlus.days.indexOf(d1);
			}
			if(typeof(d2) == "string"){
				d2 = TimePlus.days.indexOf(d2);
			}
			if(typeof(d1) != "number"){
				scriptPlusGiveErrorMessage("Could Not Determine Number");
				return;
			}
			if(typeof(d2) != "number"){
				scriptPlusGiveErrorMessage("Could Not Determine Number");
				return;
			}
			var d = d1 + d2;
			while(d >= 7){
				d -= 7;
			}
			return d;
		},
	addWeeks:function(w1, w2){
			if(typeof(w1) != "number"){
				scriptPlusGiveErrorMessage("Could Not Determine Number");
				return;
			}
			if(typeof(w2) != "number"){
				scriptPlusGiveErrorMessage("Could Not Determine Number");
				return;
			}
			var w = w1 + w2;
			while(w >= 53){
				w -= 53;
			}
			return w;
		},
	addMonths:function(m1, m2){
			if(typeof(m1) == "string"){
				m1 = TimePlus.months.indexOf(m1);
			}
			if(typeof(m2) == "string"){
				m2 = TimePlus.months.indexOf(m2);
			}
			if(typeof(m1) != "number"){
				scriptPlusGiveErrorMessage("Could Not Determine Number");
				return;
			}
			if(typeof(m2) != "number"){
				scriptPlusGiveErrorMessage("Could Not Determine Number");
				return;
			}
			var m = m1 + m2;
			while(m >= 12){
				m -= 12;
			}
			return m;
		},
	addYears:function(y1, y2){
			if(typeof(y1) == "string"){
				y1 = parseInt(y1);
			}
			if(typeof(y2) == "string"){
				y2 = parseInt(y2);
			}
			if(typeof(y1) != "number" || isNaN(y1)){
				scriptPlusGiveErrorMessage("Could Not Determine Number");
				return;
			}
			if(typeof(y2) != "number" || isNaN(y2)){
				scriptPlusGiveErrorMessage("Could Not Determine Number");
				return;
			}
			var y = y1 + y2;
			return y;
		},
	timeUntil:function(time){
			var remaining = {};
			var now = new Date();
			var start = new Date();
			var remain;
			start.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
			if(typeof(time) != "object"){
				scriptPlusGiveErrorMessage("The Object Given Was Not Recognized");
				return;
			}
			if(Object.keys(time).length != 0){
				if(time.second != undefined){
					start.setSeconds(time.second);
				} else {
					start.setSeconds(0);
				}
				if(time.minute != undefined){
					start.setMinutes(time.minute);
				} else {
					start.setMinutes(0);
				}
				if(time.hour != undefined){
					start.setHours(time.hour);
				}
				if(now > start){
					start.setDate(start.getDate() + 1);
				}
			} else {
				return {hour:24,minute:0,second:0};
			}
			remain = (start - now) / 1000;
			remaining.hour = Math.floor((remain / 3600));
			remaining.minute = Math.floor((remain / 60) % 60);
			remaining.second = Math.floor(remain % 60);
			return remaining;
		},
	startTimeTracker:function(){
			if(TimePlus.timeTracker == true){
				TimePlus.timeTracker = new Date();
				scriptPlusDebugLogging("Started A Time Tracker");
			} else {
				scriptPlusGiveErrorMessage("A Tracker Is Already Running");
			}
		},
	endTimeTracker:function(){
			if(TimePlus.timeTracker != true){
				var end = new Date();
				var elapsed = new Date();
				var fin;
				elapsed.setTime(end.getTime() - TimePlus.timeTracker.getTime());
				elapsed.setHours(elapsed.getHours() - 19);
				fin = {hours:elapsed.getHours(),minutes:elapsed.getMinutes(),seconds:elapsed.getSeconds(),milliseconds:elapsed.getMilliseconds()};
				TimePlus.timeTracker = true;
				scriptPlusDebugLogging("Ended A Time Tracker");
				return fin;
			} else {
				scriptPlusGiveErrorMessage("A Tracker Is Not Running");
			}
		},
}

function getKeyByValue(object, val){
	if(typeof(object) != "object"){
		scriptPlusGiveErrorMessage("The Object Given Was Not Recognized");
		return;
	}
	for(var prop in object){
		if(object.hasOwnProperty(prop)){
			if(object[prop] == val){
				scriptPlusDebugLogging("Found Key (" + prop + ") From Object (" + object.constructor.name + ") Using Value (" + val + ")");
				return prop;
			}
		}
	}
}

function randomNumber(min, max){
	if(typeof(min) != "number" || typeof(max) != "number"){
		scriptPlusGiveErrorMessage("The Values Given Are Not Numbers");
		return;
	}
	var rand = Math.floor(Math.random() * (max - min + 1)) + min;
	scriptPlusDebugLogging("Picked Random Value (" + rand + ") From Range (" + min + " - " + max + ")");
	return rand;
}

Array.prototype.pickValue = function(){
	var randomValue = Math.floor(Math.random()*this.length);
	scriptPlusDebugLogging("Picked Random Value (" + randomValue + ") From Range (0 - " + (this.length - 1) + ")");
	scriptPlusDebugLogging("The Value Chosen From List (" + this + ") Was (" + this[randomValue] + ")");
	return this[randomValue];
}

Date.prototype.getWeek = function() {
  var d = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - d) / 86400000) + d.getDay()+1)/7) - 1;
}

function scriptPlusDebugLogging(message){
	if(ScriptPlus.config.debug){
		console.log("%c[ScriptPlus - Version " + ScriptPlus.config.version + "] " + message, "color:#FF8C00");
	}
}

function scriptPlusGiveErrorMessage(message){
	if(CanTools.config.debug){
		console.error("%c\n[ScriptPlus - Version " + CanTools.config.version + "] " + message + "\n", "color:#ffffff;font-style:italic;font-weight:bold");
	}
}