'use strict';

var masterWindow;

(function () {
    window.addEventListener("load", main);
}());

function main() {
	var firebaseConfig = {
		apiKey: "AIzaSyCqBPlIpU7pqs4_jFTHkBjIM12wdZd3Fm4",
		authDomain: "getout-mult.firebaseapp.com",
		databaseURL: "https://getout-mult.firebaseio.com",
		projectId: "getout-mult",
		storageBucket: "getout-mult.appspot.com",
		messagingSenderId: "920446324153",
		appId: "1:920446324153:web:eff5fc4030f3f00f"
	};
	// Initialize Firebase
	var defaultApp = firebase.initializeApp(firebaseConfig);
	var database = firebase.database();
	
	readDatabase(database, 1);
	
    window.addEventListener("message", msgHandler);
    var iframe = document.getElementsByTagName("iframe")[0];

    var backBtn = document.getElementById("backButton");

    backBtn.addEventListener("click", buttonClick);
}

function buttonClick(ev) {
    masterWindow.postMessage("back_click", "*");
}

function msgHandler(ev) {
    masterWindow = ev.source;
}

function readDatabase(database, aux){
	database.ref("Ranking/"+aux).once('value').then(function(snapshot) {
		var name = snapshot.val().name;
		var time = snapshot.val().time;
		//console.log(aux);		
		//console.log(time + " - " + name);
		document.getElementById("text"+aux).innerHTML = "Name: " + name + " Time: " + time + "s";
		if(aux < 10){
			aux++;
			readDatabase(database, aux);
		}
	});
}