'use strict';

var masterWindow;

(function () {
    window.addEventListener("load", main);
}());

function main() {
    window.addEventListener("message", msgHandler);
    var iframe = document.getElementsByTagName("iframe")[0];

    // sound 
    var backBtn = document.getElementById("back");
//    var exitBtn = document.getElementById("exit");

    backBtn.addEventListener("click", buttonClick);
//    exitBtn.addEventListener("click", buttonClick);
}

function buttonClick(ev) {
    //console.log(ev.target.id);
    switch (ev.target.id) {
        case "back":
            masterWindow.postMessage("back_click", "*");
            break;
        //case "exit":
        //    masterWindow.postMessage("exit_click", "*");
        //   break;
        default:
            console.log("NOTHING");
    }
}

function msgHandler(ev) {
    masterWindow = ev.source;
}