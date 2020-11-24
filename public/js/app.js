window.onbeforeunload = () => {
    return "Are you sure?"
}

// var scoreBlue = 0;
// var scoreBlueHist = [];
// var scoreRed = 0;
// var scoreRedHist = [];
// var warningsBlue = 0;
// var warningsRed = 0;
var gameType = "";
var gameTypeWinScore = 0;

var blueFirstName = "";
var blueLastName = "";
var redFirstName = "";
var redLastName = "";

var timerOn = false;
var timerInit = 0;
var timerPause = 0;
var now = 0;
let nowShotClock = 0;

const phases = [ "1", "rest", "2"];
const timeRest = 30; // should be 30 seconds
var phasePos = 0;
var phasesTime = [0,0,0];

let nowOffset = 0;
const shotClockTime = 30;
let shotClockTimerOn = false;
let shotClockPaused = false;
const player = {
    RED: "red",
    BLUE: "blue"
}
let shotClockPlayer = null;
const scoresMap = [ -1, 1, 2, 4, 5];

$(".score.blue").text(playerBlue.score);
$(".score.red").text(playerRed.score);
$("#startTimer").prop("disabled", true);

$(document).keydown( (e) => {
    
    const blueKeysMap = [72, 74, 75, 76, 59]; // [H, J, K, L, ;]
    const redKeysMap = [71, 70, 68, 83, 65];  // [G, F, D, S, A]

    // spacebar
    if (e.keyCode == 32 && $("#startTimer").prop("disabled") == false) {
        // don't enter a "space" character
        e.preventDefault();

        startTimer(now);
        console.log("timerInit: "+timerInit);
    }
    
    // any other key (not spacebar)
    if (e.keyCode != 32 && timerOn == true) {

        if (blueKeysMap.includes(e.keyCode)){
            var addScore = scoresMap[blueKeysMap.indexOf(e.keyCode)];
            updateScore("blue", addScore);
        }

        if (redKeysMap.includes(e.keyCode)){
            var addScore = scoresMap[redKeysMap.indexOf(e.keyCode)];
            updateScore("red", addScore);
        }
        
    }

})

$("button").click( function() {
    var sideColour = this.parentElement.className;
    let buttonId = this.id;
    console.log(buttonId);
    var addScore = scoresMap[this.value];

    if (timerOn == true) {
        switch(sideColour){
// Blue scoring buttons
            case "blue buttonsRow":
                updateScore("blue", addScore);
                break;
// Red scoring buttons            
            case "red buttonsRow":
                updateScore("red", addScore);
                break;                
// Warnings and shotclock row
            case "blue penalty":
                switch(this.className){
                    // warning
                    case "warning":
                        if(warningsBlue < 2) {
                            $(".markerWarning.blue").text($(".markerWarning.blue").text() + "■");
                            warningsBlue++;
                        } else {
                            victory("red", "disqualification");
                        }
                        break;
                    // shotclock
                    case "shotclockbtn":
                        if(shotClockTimerOn) {
                            break; // can't give them a shot clock warning if the shotclock is already on or the time hasn't started yet
                        } else if(now < shotClockTime) {
                            break; // can't give them a shot clock if less than shotclock time
                        } else if (!timerOn) {
                            $(".blue.shotclock").css("visibility","visible");
                        } else if(!shotClockTimerOn) {
                            $(".blue.shotclock").css("visibility","visible");
                            shotClockPlayer = player.BLUE;
                            shotClockTimerOn = true;
                            nowOffset = now - 30;
                            console.log(nowOffset);
                        }
                        break;
                }
                break;

            case "red penalty":
                switch(this.className){
                    // warning
                    case "warning":
                        if(warningsRed < 2) {
                            $(".markerWarning.red").text($(".markerWarning.red").text() + "■");
                            warningsRed++;
                        } else {
                            victory("blue", "disqualification")
                        }
                        break;
                    // shotclock
                    case "shotclockbtn":
                        if(shotClockTimerOn) {
                            break; // can't give them a shot clock warning if the shotclock is already on or the time hasn't started yet
                        } else if(now < shotClockTime) {
                            break; // can't give them a shot clock if less than shotclock time
                        } else if (!timerOn) {
                            $(".red.shotclock").css("visibility","visible");
                        } else if(!shotClockTimerOn) {
                            $(".red.shotclock").css("visibility","visible");
                            shotClockPlayer = player.RED;
                            shotClockTimerOn = true;
                            nowOffset = now - 30;
                            console.log(nowOffset);
                        }
                        break;
                }
                break;
            
// Pins
            case "blue pin":
                victory("blue", "fall");
                break;
            case "red pin":
                victory("red", "fall");
                break;
            default:
                null;
                break;
        }; 
    };

// Shot clock
    switch(sideColour){
        case "blue penalty":
            if (this.className == "shotclockbtn"){
                if(shotClockTimerOn) {
                    break; // can't give them a shot clock warning if the shotclock is already on or the time hasn't started yet
                } else if(now < shotClockTime) {
                    break; // can't give them a shot clock if less than shotclock time

                } else if(!shotClockTimerOn || !timerOn) {
                    shotClockPlayer = player.BLUE;
                    shotClockTimerOn = true;
                    nowOffset = now - 30;
                    nowShotClock = now - nowOffset;
                    $(".shotclock").html(secondsToClock(nowShotClock));
                    $(".blue.shotclock").css("visibility","visible");
                    console.log(nowOffset);
                }
            }
            break;

        case "red penalty":
            if (this.className == "shotclockbtn"){
                if(shotClockTimerOn) {
                    break; // can't give them a shot clock warning if the shotclock is already on or the time hasn't started yet
                } else if(now < shotClockTime) {
                    break; // can't give them a shot clock if less than shotclock time
                } else if(!shotClockTimerOn) {
                    shotClockPlayer = player.RED;
                    shotClockTimerOn = true;
                    nowOffset = now - 30;
                    nowShotClock = now - nowOffset;
                    $(".shotclock").html(secondsToClock(nowShotClock));
                    $(".red.shotclock").css("visibility","visible");
                    console.log(nowOffset);
                }
            }
            break;
    }

    if (this.id === "import") {
        $("#importArea").css("display", "flex");
    }

    if (this.id === "fixtures") {
        switch( $("#fixturesTable").css("display") ) {
            case "flex":
                $("#fixturesTable").css("display", "none");
                break;
            case "none":
                $("#fixturesTable").css("display", "flex");
                break;
        }
    }

// Set game
    if (this.id==="setGame") {
        $("#playerInput").css("display", "flex")
    };

// Confirm game
    if (this.id==="setConfirmGame") {
        
        gameType = "";
        gameType = dropdownsCheckWhich()[0] + ", "+ dropdownsCheckWhich()[1] + ", " + $("select[name=weight]").val();
        $(".middle").css("backgroundColor", "black");

        if ( // check for empty fields
            $("#blueFirstName").val()==""
            || $("#blueLastName").val()==""
            || $("#blueClubName").val()==""
            || $("#redFirstName").val()==""
            || $("#redLastName").val()==""
            || $("#redClubName").val()==""
            || $("select[name=weight]").val()==""
            // || radioCheck() === 0
        ) {
                window.alert("Fill in all the names and game type!");

        } else {
            // close input area and fixtures
            $("#playerInput").css("display", "none");
            $("#fixturesTable").css("display", "none");

            // restart phase at Period 1
            phasePos = 0;
            setPhase(phasePos);

            // game type
            if (dropdownsCheckWhich()[0]=="Junior Freestyle") {
                timerInit = 120;
            } else { // for Senior Freestyle and Senior Greco-Roman
                timerInit = 180;
            }
            
            $("#gameType").text(gameType);

            // timer setup
            $("#timer").html(Math.floor(timerInit/60).toString() + ":00");
            $("#startTimer").html("▶");
            $("#startTimer").prop("disabled", false);
            timerOn = false;
            shotClockTimerOn = false;
            now = timerInit;
            phasesTime = [timerInit, timeRest, timerInit];

            // hide shot clocks
            $(".blue.shotclock").css("visibility","hidden");
            $(".red.shotclock").css("visibility","hidden");
            
            // set player names
            blueFirstName = $("#blueFirstName").val();
            blueLastName = $("#blueLastName").val();
            blueClubName = $("#blueClubName").val();
            redFirstName = $("#redFirstName").val();
            redLastName = $("#redLastName").val();
            redClubName = $("#redClubName").val();
            
            $(".blue.firstName").text(blueFirstName);
            $(".blue.lastName").text(blueLastName);
            $(".blue.clubName").text(blueClubName);
            $(".red.firstName").text(redFirstName);
            $(".red.lastName").text(redLastName);
            $(".red.clubName").text(redClubName);

            // set scores
            playerBlue.score = 0;
            playerRed.score = 0;
            $(".score.blue").text(playerBlue.score);
            $(".score.red").text(playerRed.score);
            $("div.markerWarning").text("");

            // 
            if (gameType.indexOf("Greco")>0) {
                gameTypeWinScore = 8;
            } else if (gameType.indexOf("Freestyle")>0) {
                gameTypeWinScore = 10;
            }
            
        }
    };

// Reset game
    if (this.id==="resetGame") {
        var confirm = window.confirm("Are you sure? This will reset all scores and reset the timer.");
        console.log(confirm);
        if (confirm) {
            $("#playerInput").css("display","none");
            
            playerBlue.score = 0;
            warningsBlue = 0;
            $(".score.blue").text(playerBlue.score);
            $(".blue.firstName").text("blueFirstName");
            $(".blue.lastName").text("blueLastName");
            $(".blue.clubName").text("blueClubName");
            
            playerRed.score = 0;
            warningsRed = 0;
            $(".score.red").text(playerRed.score);
            $(".red.firstName").text("redFirstName");
            $(".red.lastName").text("redLastName");
            $(".red.clubName").text("redClubName");
            
            $("#timer").html("0:00");
            gameType = "";
            $("#gameType").text(gameType);
            $("div.markerWarning").text("");

            // hide shot clocks
            $(".blue.shotclock").css("visibility","hidden");
            $(".red.shotclock").css("visibility","hidden");
        }
    };

// Start timer
    if (this.id === "startTimer"){
        window.location.href = "#main-display";
        startTimer(now);
    };

});

$(".close").click( function() {
        $(".popup").css("display", "none");
    }
)

function updateScore(side, addScore) {
    // get the player of the correct side
    let player = players.find(x => x.side === side);
    
    // add score
    if (addScore<0 && player.score ===0 || timerOn == false){
        // do nothing
    } else {
        player.score += addScore;
        $(`.score.${side}`).text(player.score);
        player.scoreHist.push(addScore);
        console.log(player.scoreHist);
        if(shotClockTimerOn){
            shotClockTimerOn = false; 
        }
        criteria();
    };

    if ( Math.abs(playerBlue.score-playerRed.score)>=gameTypeWinScore) {
        // get the winning score
        let scoreWinner = Math.max(playerBlue.score, playerRed.score);
        // get the side of the player with the winning score
        let side = players.find(x => x.score === scoreWinner).side;
        // declare victory
        victory(side, "technical superiority");
    }
}

function criteria() {}

    scoreRedMax = Math.max(...playerRed.scoreHist);
    scoreRedLast = playerRed.scoreHist[playerRed.scoreHist.length-1];
    scoreBlueMax = Math.max(...playerBlue.scoreHist);
    scoreBlueLast = playerBlue.scoreHist[playerBlue.scoreHist.length-1];
    if(playerRed.score == playerBlue.score) {
        if (scoreRedMax > scoreBlueMax) {
            $(".red.score").css("text-decoration", "underline")
        } else if (scoreRedMax < scoreBlueMax) {
            $(".blue.score").css("text-decoration", "underline");    
        } else if (scoreRedMax == scoreBlueMax)  {
            // pick the more recent one and take 
            // read page 25 of regulation
        }
    } else {
        $(".red.score").css("text-decoration", "");
        $(".blue.score").css("text-decoration", "");
    }
}