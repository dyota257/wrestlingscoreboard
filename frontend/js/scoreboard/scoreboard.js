// No longer need this alert - will use a permanent database connection instead
// window.onbeforeunload = () => {return "Are you sure?"}

let gameType = ""; // 'Senior Greco-Roman' | 'Senior Freestyle' | 'Junior Freestyle' | 'Exhibition'
let gameTypeWinScore = 0;
let disqualification = '';

let timerOn = false;
let timerInit = 0; // 120 | 180
let timerPause = 0;
let now = 0;
let nowShotClock = 0;
let matchTime = 0;

// only two phases - no need to codify rest period
const phases = [ "1", "2"];
const timeValue = [
    30, // Rest period 30 s
    120, // 2 mins (juniors)
    180 // 3 mins (seniors)
];

// should be 30 seconds
let phasePos = 0;
let phasesTime = [0,0,0];
 
let nowOffset = 0;
const shotClockTime = 30;
let shotClockTimerOn = false;
let shotClockPaused = false;
let shotClockPlayer = null;

$(".score.blue").text(playerBlue.score);
$(".score.red").text(playerRed.score);
disable("#startTimer");

$("button").click(() => {
    // prevent focus after clicking on the button
    this.blur();
});

function closePopup() {
    displayNone(".popup");
    unhide('#announcevictory');
}

function reset(scores, warnings, shotclocks, gameType) {
    if (scores) {
        playerBlue.score = 0;
        playerRed.score = 0;
        $(".score").text(0);
        noDecorate(".score");
    };

    if (warnings) {
        playerBlue.warnings = 0;
        playerRed.warnings = 0;
        $("div.markerWarning").text("");
    };

    if (shotclocks) {
        hide(".shotclock");
    };

    if (gameType) {
        gameType = "";
        $("#gameType").text(gameType);
        gameTypeWinScore = 0;
    }
};

function setGameType(text) {
    gameType = text;
    console.log('gameType: ' + gameType);
}

function setMatchTime(number) {
    matchTime = number * 60;
    console.log('matchTime: ' + matchTime);
}