'use strict';

var masterWindow;
var audioVolume = 1;

(function()
{
	window.addEventListener("load", main);
}());

function main(){    
    window.addEventListener("message", msgHandler);
    var iframe = document.getElementsByTagName("iframe")[0];

    var modhistBtn = document.getElementById("modhist");
    var rankBtn = document.getElementById("rank");
    var tutorialBtn = document.getElementById("tutorial");
    var creditosBtn = document.getElementById("creditos");
    var optionsBtn = document.getElementById("options");
//    var exitBtn = document.getElementById("exit");
    //var song = document.getElementsByTagName("audio")[0];

    modhistBtn.addEventListener("click", buttonClick);
    rankBtn.addEventListener("click", buttonClick);
    tutorialBtn.addEventListener("click", buttonClick);
    creditosBtn.addEventListener("click", buttonClick);
    optionsBtn.addEventListener("click", buttonClick);
//    exitBtn.addEventListener("click", buttonClick);

    //song.loop = true;
    //song.volume = audioVolume;
    //song.play();
}

function buttonClick(ev) {
    //console.log(ev.target.id);
    switch (ev.target.id) {
        case "modhist":
            masterWindow.postMessage("modHist_click", "*");
            break;
        case "rank":
            masterWindow.postMessage("leaderboard_click", "*");
            break;
        case "tutorial":
            masterWindow.postMessage("tutorial_click", "*");
            break;
        case "creditos":
            masterWindow.postMessage("credits_click", "*");
            break;
        case "options":
            masterWindow.postMessage("settings_click", "*");
            break;
//        case "exit":
//            masterWindow.postMessage("exit_click", "*");
//            break;
        default:
            console.log("NOTHING");
    }
}

function msgHandler(ev) {
    masterWindow = ev.source;
}