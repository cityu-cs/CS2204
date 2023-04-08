// for index.html

// Global variables
const msgs = [
    "DISNEY PREMIER ACCESS & 1-DAY TICKET COMBO, STARTING FROM HK $798",
    "DISNEY PREMIER ACCESS & 8-ATTRACTIONS WITH 1 SHOW, STARTING FROM HK $379",
    "DISNEY PREMIER ACCESS - 1-ATTRACTION, STARTING FROM HK $79"
];
const msgLen = msgs.length;
var msgCur = 0;
const videos = [
    "https://personal.cs.cityu.edu.hk/~cs2204/video/Castle.mp4",
    "https://personal.cs.cityu.edu.hk/~cs2204/video/Musical_Journey.mp4"
];
const videoLen = videos.length;
var videoCur = 0;
const formErr = "Data not completed, please re-enter.";
const formRes = [
    "Disneyland has reached the maximum number of visitors for the day.",
    "Reservation done. Thank you."
];

// initialize
window.onload = function () {
    // set a random message
    let message = document.getElementById("message");
    msgCur = Math.floor(Math.random() * msgLen);
    message.innerHTML = msgs[msgCur];
    // update the message
    setInterval("updateMessage()", 3000);
    // set up event handlers
    let submit = document.querySelector(".form_button input"); // returns the first
    submit.onclick = validateForm; // event handler
    // hide form error message
    let formError = document.getElementById("form_error");
    formError.display = "none";
};

// update the message
function updateMessage() {
    let message = document.getElementById("message");
    msgCur = (msgCur + 1) % msgLen;
    message.innerHTML = msgs[msgCur];
}

// switch the video when it ends
// this function is triggered by <video onended="switchVideo()">
function switchVideo() {
    let video = document.getElementById("vid");
    videoCur = (videoCur + 1) % videoLen;
    video.src = videos[videoCur];
    video.play();
}

// validate the form
function validateForm() {
    let date = document.getElementById("Date").value;
    let time = document.getElementById("Time").value;
    let visitor = document.getElementById("visitor").value;
    let formError = document.getElementById("form_error");
    // check if date and visitor number are filled and not all-spaces
    if (date.trim() == "" || visitor.trim() == "") {
        formError.innerHTML = formErr;
        formError.display = "block";
        return false; // cancel form submission
    }
    // validation passed
    formError.innerHTML = "";
    formError.display = "none";
    if (reserve(date, time, visitor)) {
        alert(formRes[1]);
    } else {
        alert(formRes[0]);
    }
    return false; // cancel form submission
}