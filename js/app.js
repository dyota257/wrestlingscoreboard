window.onbeforeunload = () => {
    return "Are you sure?"
}

var scoreBlue = 0;
var scoreBlueHist = [];
var scoreRed = 0;
var scoreRedHist = [];
var warningsBlue = 0;
var warningsRed = 0;
var gameType = "";

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
const shotClockTime = 30;
let shotClockTimerOn = false;
let shotClockPaused = false;
const player = {
    RED: "red",
    BLUE: "blue"
}
let shotClockPlayer = null;
const scoresMap = [ -1, 1, 2, 4, 5];

$(".score.blue").text(scoreBlue);
$(".score.red").text(scoreRed);
$("#startTimer").prop("disabled", true);

$(document).keydown( (e) => {
    
    const blueKeysMap = [72, 74, 75, 76, 59]; //[H, J, K, L, ;]
    const redKeysMap = [71, 70, 68, 83, 65];  // [G, F, D, S, A]

    if (e.keyCode == 32 && $("#startTimer").prop("disabled") == false) {
        e.preventDefault();
        startTimer(now);
        console.log("timerInit: "+timerInit);
    }
    
    if (e.keyCode != 32 && timerOn == true) {

        if (blueKeysMap.includes(e.keyCode)){
            var addScore = scoresMap[blueKeysMap.indexOf(e.keyCode)];
            blueScoreUpdate(addScore);
        }

        if (redKeysMap.includes(e.keyCode)){
            var addScore = scoresMap[redKeysMap.indexOf(e.keyCode)];
            redScoreUpdate(addScore);
        }
        
    }

})

$("button").click(function() {
    var sideColour = this.parentElement.className;
    let buttonId = this.id;
    console.log(buttonId);
    var addScore = scoresMap[this.value];

    if (timerOn == true) {
        switch(sideColour){
// Blue scoring buttons
            case "blue buttonsRow":
                blueScoreUpdate(addScore);
                break;
// Red scoring buttons            
            case "red buttonsRow":
                redScoreUpdate(addScore);
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
                    case "shotclockbtn":
                        if(buttonId === "shotclockbuttonblue" && (shotClockTimerOn === true||timerOn === false)){
                            break; // can't give them a shot clock warning if the shotclock is already on or the time hasn't started yet
                        } else if(now < shotClockTime){
                            break; // can't give them a shot clock if less than shotclock time
                        } else if(buttonId === "shotclockbuttonblue" && shotClockTimerOn === false){
                            $(".blue.shotclock").css("visibility","visible");
                            shotClockPlayer = player.BLUE;
                            shotClockTimer(shotClockTime);
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
                        if(buttonId === "shotclockbuttonred" && (shotClockTimerOn === true||timerOn === false)){
                            break; // can't give them a shot clock warning if the shotclock is already on or the time hasn't started yet
                        } else if(now < shotClockTime){
                            break; // can't give them a shot clock if less than shotclock time
                        } else if(buttonId === "shotclockbuttonred" && shotClockTimerOn === false){
                            $(".red.shotclock").css("visibility","visible");
                            shotClockPlayer = player.RED;
                            shotClockTimer(shotClockTime);
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
            scoreBlue = 0;
            scoreRed = 0;
            $(".score.blue").text(scoreBlue);
            $(".score.red").text(scoreRed);
            $("div.markerWarning").text("");
        }
    };

// Reset game
    if (this.id==="resetGame") {
        var confirm = window.confirm("Are you sure? This will reset all scores and reset the timer.");
        console.log(confirm);
        if (confirm) {
            $("#playerInput").css("display","none");
            scoreBlue = 0;
            warningsBlue = 0;
            $(".score.blue").text(scoreBlue);
            $(".blue.firstName").text("blueFirstName");
            $(".blue.lastName").text("blueLastName");
            $(".blue.clubName").text("blueClubName");
            scoreRed = 0;
            warningsRed = 0;
            $(".score.red").text(scoreRed);
            $(".red.firstName").text("redFirstName");
            $(".red.lastName").text("redLastName");
            $(".red.clubName").text("redClubName");
            
            $("#timer").html("0:00");
            gameType = "";
            $("#gameType").text(gameType);
            $("div.markerWarning").text("");
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

// should really refactor and combine blueScoreUpdate and redScoreUpdate, also should make a class called players and make each player an object, would simply a lot of code
function blueScoreUpdate(addScore) {
    if (addScore<0 && scoreBlue===0 || timerOn == false){
        //do nothing
    } else {
        scoreBlue += addScore;
        $(".score.blue").text(scoreBlue);
        scoreBlueHist.push(addScore);
        console.log(scoreBlueHist);
        if(shotClockTimerOn === true){
            shotClockTimerOn = false; 
        }
        criteria();
    };
    // Greo tech sup
    if (scoreBlue-scoreRed>=8 && gameType.indexOf("Greco")>0) {
        victory("blue", "technical superiority");
    } else
    // Freestyle tech sup
    if(scoreBlue-scoreRed>=10 && gameType.indexOf("Freestyle")>0 ){
        victory("blue", "technical superiority");
    }
}

function redScoreUpdate(addScore) {
    if (addScore<0 &&scoreRed===0 || timerOn == false){
        //do nothing
    } else {
        scoreRed += addScore;
        $(".score.red").text(scoreRed);
        scoreRedHist.push(addScore);
        console.log(scoreRedHist);
        if(shotClockTimerOn === true){
            shotClockTimerOn = false; 
        }
        criteria();
    }
    // Greo tech sup
    if (scoreRed-scoreBlue>=8 && gameType.indexOf("Greco")>0) {
        victory("red", "technical superiority");
    } else
    // Freestyle tech sup
    if(scoreRed-scoreBlue>=10 && gameType.indexOf("Freestyle")>0){
        victory("red", "technical superiority")   ;
    } 
}

function criteria() {
    scoreRedMax = Math.max(...scoreRedHist);
    scoreRedLast = scoreRedHist[scoreRedHist.length-1];
    scoreBlueMax = Math.max(...scoreBlueHist);
    scoreBlueLast = scoreBlueHist[scoreBlueHist.length-1];
    if(scoreRed == scoreBlue) {
        if (scoreRedMax > scoreBlueMax) {
            $(".red.score").css("text-decoration", "underline")
        } else if (scoreRedMax < scoreBlueMax) {
            $(".blue.score").css("text-decoration", "underline");    
        } else if (scoreRedMax == scoreBlueMax)  {
            // pick the more recent one and take 
            // read page 25 of regulations


        }
    } else {
        $(".red.score").css("text-decoration", "");
        $(".blue.score").css("text-decoration", "");
    }
}



