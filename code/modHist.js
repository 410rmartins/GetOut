'use strict';

var masterWindow;
var database;

(function () {
    window.addEventListener("load", main);
}());

function main() {
    window.addEventListener("message", msgHandler);
    var iframe = document.getElementsByTagName("iframe")[0];

    var startBtn = document.getElementById("startButton");
    var backBtn = document.getElementById("backButton");

    startBtn.addEventListener("click", buttonClick);
    backBtn.addEventListener("click", buttonClick);
}

function buttonClick(ev) {
    //console.log(ev.target.id);
    switch (ev.target.id) {
        case "startButton":
            var nickname = document.getElementById("nickname").value;
            //auxSendToDatabase(120, nickname, database, 1);
			addNickname(nickname);
            masterWindow.postMessage("startGame_click", "*");
            break;
        case "backButton":
            masterWindow.postMessage("back_click", "*");
            break;
        default:
            console.log("NOTHING");
    }
}

function addNickname(nickname) {
    var string = document.cookie.split(";");
    var field = string[1].split("=");
    field[1] = nickname;
    string[1] = field[0] + "=" + field[1];
    for (var i = 0; i < string.length; i++) {
        document.cookie = string[i];
    }
}

//function addTime(time) {
//    var string = document.cookie.split(";");
//    var field = string[0].split("=");
//    field[1] = time;
//    string[1] = field[0] + "=" + field[1];
//    for (var i = 0; i < string.length; i++) {
//        document.cookie = string[i];
//    }
//}

function msgHandler(ev) {
    masterWindow = ev.source;
}

