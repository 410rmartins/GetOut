"use strict";

var audioVolume = 1;

(function () {
    window.addEventListener("load", main);
} ());

function main() {
    //document.cookie="nickname=;volume=;nivel="
	document.cookie = "time=";
	document.cookie = "nickname=";
    window.addEventListener("message", msgHandler);
    var iframe = document.getElementsByTagName("iframe")[0];
    iframe.addEventListener("load", startFrame);

    showPage("html/MainMenu.html");
}

function startFrame(ev) {
    ev.target.contentWindow.postMessage("start", "*");
}

function showPage(page) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src = page;
}

function msgHandler(ev) {
    console.log(ev.data);
    switch (ev.data) {
        case "modHist_click":
            showPage("html/ModHist.html");
            break;
        case "settings_click":
            showPage("html/Settings.html");
            break;
        case "tutorial_click":
            showPage("html/Tutorial.html");
            break;
        case "leaderboard_click":
            showPage("html/Leaderboard.html");
            break;
        case "credits_click":
            showPage("html/Credits.html");
            break;
        case "back_click":
            showPage("html/MainMenu.html");
            break;
        case "startGame_click":
            showPage("html/index.html");
            break;
        case "up_sound":
            var song = document.getElementsByTagName("audio")[0];
            if (song.volume < 1) {
                song.volume += 0.1;
                audioVolume = song.volume;
            }
            break;
        case "down_sound":
            var song = document.getElementsByTagName("audio")[0];
            if (song.volume > 0) {
                song.volume -= 0.1;
                audioVolume = song.volume;
            }
            break;
        case "mute":
            var song = document.getElementsByTagName("audio")[0];
            if (song.volume != 0) {
                audioVolume = song.volume;
                song.volume = 0;
            }
            break;
        case "unmute":
            var song = document.getElementsByTagName("audio")[0];
            song.volume = audioVolume;
            break;
		case "victory":
			showPage("html/winScreen.html");
			break;
		case "game_over":
			showPage("html/gameOverScreen.html");
			break;
        default:
            console.log("INVALID_COMMAND");
    }
}