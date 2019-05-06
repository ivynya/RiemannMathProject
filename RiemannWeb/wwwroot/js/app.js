﻿var video = null;
var snapButton = null;
var errorMsgElement = null;

document.addEventListener("DOMContentLoaded", function () {
    video = document.getElementById("video");
    snapButton = document.getElementById("snapButton");
    errorMsgElement = document.querySelector("span#errorMsg");
    helpMenu = document.querySelector("#help");

    init();
});

const constraints = {
    video: {
        width: innerWidth, height: innerHeight
    }
};

async function init() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        window.stream = stream;
        video.srcObject = stream;
    } catch (e) {
        errorMsgElement.style.display = "block";
        errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
}

function snap() {
    video.pause();
    snapButton.onclick = retake;
    snapButton.value = "Retake";
}

function retake() {
    video.play();
    snapButton.onclick = snap;
    snapButton.value = "Capture";
}

function helpToggle() {
    if (helpMenu.style.display === "none") {
        helpMenu.style.display = "block";
    }
    else {
        helpMenu.style.display = "none";
    }
}