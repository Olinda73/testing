const functions = require('firebase-functions');
var name
var role
var startDate
var monthlyRate

 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCFx6EEPuadPlNmiWDpXJZmo5jifmakrhk",
    authDomain: "nbc-changemanagement.firebaseapp.com",
    databaseURL: "https://nbc-changemanagement.firebaseio.com",
    projectId: "nbc-changemanagement",
    storageBucket: "nbc-changemanagement.appspot.com",
    messagingSenderId: "230090365679",
    appId: "1:230090365679:web:36c2f650f6b3ab561ed91a",
    measurementId: "G-7P5XXLMPFF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

$("#add-employee").on("click", function(){

	name = $("#name-input").val().trim();
	role = $("#role-input").val().trim();
	startDate = $("#start-date-input").val().trim();
	monthlyRate = $("#monthly-rate-input").val().trim();

	database.ref().push({
		name: name,
		role: role,
		startDate: startDate,
		monthlyRate: monthlyRate,
		dataAdded: firebase.database.ServerValue.TIMESTAMP

	});
});


database.ref().on("value", function(snapshot) {

	var sv = snapshot.val();

	var svArr = Object.keys(sv);

	var lastIndex = svArr.length - 1;

	var lastKey = svArr[lastIndex];

	var lastObj = sv[lastKey];

	console.log(lastObj.name);
	console.log(lastObj.role);
	console.log(lastObj.startDate);
	console.log(lastObj.monthlyRate);

});

database.ref().on("child_added", function(childSnapshot) {

	console.log(childSnapshot.val().name);
	console.log(childSnapshot.val().role);
	console.log(childSnapshot.val().startDate);
	console.log(childSnapshot.val().monthlyRate);

	//append to the table
	// $("#directory").append("")
	var addEmployeeRow = $("#add-employee-row");

	var employeeData = "<tr>";
	employeeData += "<td>" + childSnapshot.val().name + "</td>";
	employeeData += "<td>" + childSnapshot.val().role + "</td>";
	employeeData += "<td>" + childSnapshot.val().startDate + "</td>";
	employeeData += "<td></td>";
	employeeData += "<td>" + childSnapshot.val().monthlyRate + "</td>";
	employeeData += "<td></td>";
	employeeData += "</tr>";

	addEmployeeRow.append(employeeData);

}, function(errorObject) {
		console.log("Errors handled: " + errorObject.code);
});


	//based on the field, order by that field (date); limit to ONE record
	database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

		$("#test").append(snapshot.val().name);
		$("#test").append(snapshot.val().role);
		$("#test").append(snapshot.val().startDate);
		$("#test").append(snapshot.val().monthlyRate);

	})
