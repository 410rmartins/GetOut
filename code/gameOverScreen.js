'use strict';

var masterWindow;

(function () {
    window.addEventListener("load", main);
}());

function main(){
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