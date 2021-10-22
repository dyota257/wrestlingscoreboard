// No longer need this alert - will use a permanent database connection instead
// window.onbeforeunload = () => {return "Are you sure?"}

var gameType = "";
var gameTypeWinScore = 0;
var disqualification = '';

var timerOn = false;
var timerInit = 0;
var timerPause = 0;
var now = 0;
let nowShotClock = 0;

const phases = [ "1", "rest", "2"];
const timeValue = [
    30, // Rest period 30 s
    120, // 2 mins (juniors)
    180 // 3 mins (seniors)
];

// should be 30 seconds
var phasePos = 0;
var phasesTime = [0,0,0];
 
let nowOffset = 0;
const shotClockTime = 30;
let shotClockTimerOn = false;
let shotClockPaused = false;
let shotClockPlayer = null;
const scoresMap = [ -1, 1, 2, 4, 5];

$(".score.blue").text(playerBlue.score);
$(".score.red").text(playerRed.score);
$("#startTimer").prop("disabled", true);

$("button").click( function() {
    this.blur();

    // the first class of parentElement.className is the colour blue/red
    var side = this.parentElement.className.split(" ")[0];
    let buttonId = this.id;
    console.log("buttonId: " + buttonId);
    console.log("side: " + side);
    console.log("parentElement.className: " + this.parentElement.className);

    switch(this.parentElement.className){
        
// Warnings and shotclock row
        case `${side} penalty`:
            switch(this.className){
                // warning
                case "warning":
                    switch(side) {
                        case "red":
                            playerX = playerRed;
                            payerY = playerBlue;
                            break;
                        case "blue":
                            playerX = playerBlue;
                            payerY = playerRed;
                            break;
                    }
                    if(playerX.warnings < 2) {
                        $(`.markerWarning.${side}`).append("■");
                        playerX.warnings++;
                    } else {
                        $(`.markerWarning.${side}`).append("■")
                        playerX.warnings++;
                        // the other side wins
                        unhide('#announcevictory');
                        disqualification = side;
                        // victory(playerY.side, "disqualification");
                    }
                    break;
                // shotclock
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

// Reset game
    if (this.id==="resetGame") {
        var confirm = window.confirm("Are you sure? This will reset all scores and reset the timer.");
        
        if (confirm) {
            displayNone("#playerInput");
            
            // reset scores, warnings, shotclocks, gameType
            reset(true,true,true,true);
            hide('#announcevictory');
            disqualification = false;
            
            $(".blue.firstName").text("blueFirstName");
            $(".blue.lastName").text("blueLastName");
            $(".blue.clubName").text("blueClubName");
            $(".red.firstName").text("redFirstName");
            $(".red.lastName").text("redLastName");
            $(".red.clubName").text("redClubName");
            
            $("#timer").html("0:00");
        }
    };


});

$(".close").click( function() {
        $(".popup").css("display", "none");
        unhide('#announcevictory');
    }
)

function reset(scores, warnings, shotclocks, gameType) {
    if (scores) {
        playerBlue.score = 0;
        playerRed.score = 0;
        $(".score").text(0);
        $(".score").css("text-decoration", "none");
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

}

function updateScore(side, addScore) {
    // get the clone player of the correct side
    let i; if (side === 'blue') { i = 0} 
    else if (side === 'red') {i = 1}
    let player = players[i]

    // add score
    if (addScore<0 && player.score === 0 ||  gameType === ""){
        // do nothing
    } else {
        player.score += addScore;
        $(`.score.${side}`).text(player.score);
        player.scoreHist.push(addScore);
        if(shotClockTimerOn){
            shotClockTimerOn = false; 
        }
        // return the clone to the real player
        if (side === 'blue') { playerBlue = player}
        else if (side === 'red') {playerRed = player}
        
        criteria();
    };

    if (Math.abs(playerBlue.score-playerRed.score) >= gameTypeWinScore && gameType != "") {
        unhide('#announcevictory');
    } else {
        hide('#announcevictory');
    }
}

function criteria() {
    scoreRedMax = Math.max(...playerRed.scoreHist);
    scoreRedLast = playerRed.scoreHist[playerRed.scoreHist.length-1];
    scoreBlueMax = Math.max(...playerBlue.scoreHist);
    scoreBlueLast = playerBlue.scoreHist[playerBlue.scoreHist.length-1];
    if(playerRed.score == playerBlue.score) {
        if (scoreRedMax > scoreBlueMax) {
            underline(".red.score");
        } else if (scoreRedMax < scoreBlueMax) {
            underline(".blue.score");
        } else if (scoreRedMax == scoreBlueMax)  {
            // pick the more recent one and take 
            if (scoreRedLast > scoreBlueLast) {
                underline(".red.score");
            } else if (scoreRedLast < scoreBlueLast) {
                underline(".blue.score");
            }
            
            // read page 25 of regulation
        }
    } else {
        $(".score").css("text-decoration", "");
    }
}