var schedule;

function loadSchedule() {
	if (currentSchedule.schedule != undefined) {
		schedule = currentSchedule.schedule;
		clearInterval(interval);
		createTable();
	}
}

var interval = setInterval(loadSchedule, 100);


function createTable() {

	for (var i = 0; i < schedule.length; i++) {
		if (schedule[i].passing) {
			i++
		}

		var tableContainer = document.createElement("tr");
		var periodRow = document.createElement("td");
		var timeRow = document.createElement("td");
		var periodVal = document.createTextNode(schedule[i].periodNum);
		var timeVal = document.createTextNode(convertTime(schedule[i].startTime, schedule[i].endTime));

		periodRow.appendChild(periodVal);
		timeRow.appendChild(timeVal);


		if(period.periodNum == schedule[i].periodNum && !schedule[i].passing){
			periodRow.setAttribute("class", "row selected");
			timeRow.setAttribute("class", "row selected");
		} else {
					periodRow.setAttribute("class", "row");
					timeRow.setAttribute("class", "row");
		}

		tableContainer.appendChild(periodRow);
		tableContainer.appendChild(timeRow);

		var table = document.getElementsByTagName("table")[0];
		table.appendChild(tableContainer);

	}
}

function convertTime(start, end) {
	var output = "";
	var startHour;
	var endHour;
	var startMinute;
	var endMinute;
	if (start.hour <= 12) {
		startHour = start.hour;
	} else {
		startHour = start.hour - 12;
	}

	if (end.hour <= 12) {
		endHour = end.hour;
	} else {
		endHour = end.hour - 12;
	}

	if (start.minute < 10) {
		startMinute = "0" + start.minute;
	} else {
		startMinute = start.minute;
	}

	if (end.Minute < 10) {
		endMinute = "0" + end.minute;
	} else {
		endMinute = end.minute;
	}

	output += startHour + ":" + startMinute + " - " + endHour + ":" + endMinute;

	return output;

}
