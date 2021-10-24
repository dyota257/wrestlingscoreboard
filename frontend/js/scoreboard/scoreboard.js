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

$("button").click( function() {
    this.blur();

    // the first class of parentElement.className is the colour blue/red
    var side = this.parentElement.className.split(" ")[0];

    switch(this.parentElement.className){
// Warnings and shotclock row
        case `${side} penalty`:
            switch(this.className){
                case "shotclockbtn":
                    if(shotClockTimerOn) {
                        break; // can't give them a shot clock warning if the shotclock is already on or the time hasn't started yet
                    } else if(now < shotClockTime) {
                        break; // can't give them a shot clock if less than shotclock time
                    } else if (!timerOn) {
                        unhide(`.${side}.shotclock`);
                    } else if(!shotClockTimerOn) {
                        unhide(`.${side}.shotclock`);
                        shotClockPlayer = players.find(x => x.side === side).side;
                        shotClockTimerOn = true;
                        nowOffset = now - 30;
                        // console.log(nowOffset);
                    }
                    break;
            }
            break;
// Pins
        default:
            null;
            break;
    }; 
});

$(".close").click( function() {
        displayNone(".popup");
        unhide('#announcevictory');
    }
)

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