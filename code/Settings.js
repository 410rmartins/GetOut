'use strict';

var masterWindow;
//var volume = 1; //document.getElementsByTagName("audio")[0].volume;
//var antVolume = volume;

(function () {
    window.addEventListener("load", main);
}());

function main() {
    window.addEventListener("message", msgHandler);
    var iframe = document.getElementsByTagName("iframe")[0];
    
    var backBtn = document.getElementById("back");
    var upSound = document.getElementById("upSound");
    var downSound = document.getElementById("downSound");
    var muteSound = document.getElementById("mute");
    var unmuteSound = document.getElementById("unmute");

    //document.getElementById("demo").innerHTML = 10 * parseInt(10 * volume) + "%";
    backBtn.addEventListener("click", buttonClick);
    upSound.addEventListener("click", buttonClick);
    downSound.addEventListener("click", buttonClick);
    muteSound.addEventListener("click", buttonClick);
    unmuteSound.addEventListener("click", buttonClick);
}

function buttonClick(ev) {
    //console.log(ev.target.id);
    switch (ev.target.id) {
        case "upSound":
            //if (volume < 1) {
            //    volume += 0.1;
            //}
            //antVolume = volume;
            //document.getElementById("demo").innerHTML = 10 * parseInt(10 * volume) + "%";
            masterWindow.postMessage("up_sound");
            break;
        case "downSound":
            //if (volume > 0) {
			//	volume -= 0.1;
            //}
            //antVolume = volume;
            //document.getElementById("demo").innerHTML = 10 * parseInt(10 * volume) + "%";
            masterWindow.postMessage("down_sound");
            break;
        case "mute":
            //if (volume != 0) {
            //    antVolume = volume;
            //    volume = 0;
            //}
            //document.getElementById("demo").innerHTML = 10 * parseInt(10 * volume) + "%";
            masterWindow.postMessage("mute");
            break;
        case "unmute":
            //volume = antVolume;
            //document.getElementById("demo").innerHTML = 10 * parseInt(10 * volume) + "%";
            masterWindow.postMessage("unmute");
            break;
        case "back":
            masterWindow.postMessage("back_click", "*");
            break;
        default:
            console.log("NOTHING");
    }
}

function msgHandler(ev) {
    masterWindow = ev.source;
}