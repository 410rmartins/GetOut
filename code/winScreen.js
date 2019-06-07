'use strict';

var masterWindow;

(function () {
    window.addEventListener("load", main);
}());

function main(){
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
	
	var leitura = leCookie();
	var username = leitura[0];
	var time = leitura[1];
	auxSendToDatabase(time, username, database, 1);
	
	document.getElementById("text").innerHTML = time + "s";
	
	window.addEventListener("message", msgHandler);
	var iframe = document.getElementsByTagName("iframe")[0];
	var backBtn = document.getElementById("back");
	backBtn.addEventListener("click", buttonClick);
}

function buttonClick(ev){
	masterWindow.postMessage("back_click", "*");
}

function msgHandler(ev) {
    masterWindow = ev.source;
}

function auxSendToDatabase(numDatabase, nomeDatabase, database, aux) {
	database.ref("Ranking/"+aux+"/").once('value').then(function(snapshot) {
		var name = snapshot.val().name;
		var time = snapshot.val().time;
		if(time >= numDatabase){
			database.ref("Ranking/"+aux).set({
				name: nomeDatabase,
				time: numDatabase
			});
			if(aux < 10){
				aux++;
				auxSendToDatabase(time, name, database, aux);
			}
		}else{
			if(aux < 10){
				aux++;
				auxSendToDatabase(numDatabase, nomeDatabase, database, aux);
			}
		}
	});
}

function leCookie(){
	var string = document.cookie.split(";");
    var time = string[0].split("="); 
	var nickname = string[1].split("=");
	return [time[1], nickname[1]];
}