window.onbeforeunload = () => {
    return "Are you sure?"
}

var gameType = "";
var gameTypeWinScore = 0;

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
let shotClockPlayer = null;
const scoresMap = [ -1, 1, 2, 4, 5];

$(".score.blue").text(playerBlue.score);
$(".score.red").text(playerRed.score);
$("#startTimer").prop("disabled", true);

$(document).keydown( (e) => {
    
    const blueKeysMap = [72, 74, 75, 76, 59]; // [H, J, K, L, ;]
    const redKeysMap = [71, 70, 68, 83, 65];  // [G, F, D, S, A]

    // spacebar
    if (
        e.keyCode == 32 
        && $("#startTimer").prop("disabled") == false 
        && $('#playerInput').css('display') === 'none'
    ) {
        // don't enter a "space" character if it's not in text input mode
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
    this.blur();

    // the first class of parentElement.className is the colour blue/red
    var side = this.parentElement.className.split(" ")[0];
    let buttonId = this.id;
    console.log("buttonId: " + buttonId);
    var addScore = scoresMap[this.value];

    console.log("side: " + side);
    console.log("parentElement.className: " + this.parentElement.className);

    switch(this.parentElement.className){
// scoring buttons
        case `${side} buttonsRow`:
            updateScore(side, addScore);          
            break;
// Warnings and shotclock row
        case `${side} penalty`:
            switch(this.className){
                // warning
                case "warning":
                    if(players[playerNumber].warnings < 2) {
                        $(`.markerWarning.${side}`).text($(`.markerWarning.${side}`).text() + "■");
                        players[playerNumber].warnings++;
                    } else {
                        // the other side wins
                        victory(players[Math.abs(playerNumber-1)].side, "disqualification");
                    }
                    break;
                // shotclock
                case "shotclockbtn":
                    if(shotClockTimerOn) {
                        break; // can't give them a shot clock warning if the shotclock is already on or the time hasn't started yet
                    } else if(now < shotClockTime) {
                        break; // can't give them a shot clock if less than shotclock time
                    } else if (!timerOn) {
                        $(`.${side}.shotclock`).css("visibility","visible");
                    } else if(!shotClockTimerOn) {
                        $(`.${side}.shotclock`).css("visibility","visible");
                        shotClockPlayer = players.find(x => x.side === side).side;
                        shotClockTimerOn = true;
                        nowOffset = now - 30;
                        // console.log(nowOffset);
                    }
                    break;
            }
            break;
// Pins
        case `${side} pin`:
            victory(side, "fall");
            break;
        default:
            null;
            break;
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

// Set game - cancel set game
    if (this.id==="setGame") {
        $("#playerInput").css("display", "flex")
    };
    
    if (this.id==="cancelConfirmGame") {
        $("#playerInput").css("display", "none")
    }

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
            playerBlue = {...playerBlue,...{
                    firstName: $("#blueFirstName").val(),
                    lastName: $("#blueLastName").val(),
                    clubName: $("#blueClubName").val()
                }
            };
            playerRed = {...playerRed,...{
                    firstName: $("#redFirstName").val(),
                    lastName: $("#redLastName").val(),
                    clubName: $("#redClubName").val()
                }
            };

            $(".blue.firstName").text(playerBlue.firstName);
            $(".blue.lastName").text(playerBlue.lastName);
            $(".blue.clubName").text(playerBlue.clubName);
            $(".red.firstName").text(playerRed.firstName);
            $(".red.lastName").text(playerRed.lastName);
            $(".red.clubName").text(playerRed.clubName);

            // reset scores, warnings, shotclocks
            reset(true,true,true);

            if (gameType.indexOf("Greco")>0) {
                gameTypeWinScore = 8;
            } else if (gameType.indexOf("Freestyle")>0) {
                gameTypeWinScore = 10;
            }
            
            // confirm and set up for records
            let inputMatchID = $('td[data-label="id"]')[matchOrder].textContent.trim();
            $("input[name='matchID']").val(inputMatchID);
            let path = window.location.pathname.split('/');
            $("input[name='mat']").val(path[2]);
        }
    };

// Reset game
    if (this.id==="resetGame") {
        var confirm = window.confirm("Are you sure? This will reset all scores and reset the timer.");
        
        if (confirm) {
            $("#playerInput").css("display","none");
            
            // reset scores, warnings, shotclocks, gameType
            reset(true,true,true, true);
            
            $(".blue.firstName").text("blueFirstName");
            $(".blue.lastName").text("blueLastName");
            $(".blue.clubName").text("blueClubName");
            $(".red.firstName").text("redFirstName");
            $(".red.lastName").text("redLastName");
            $(".red.clubName").text("redClubName");
            
            $("#timer").html("0:00");
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
        $(".shotclock").css("visibility","hidden");
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

    if ( Math.abs(playerBlue.score-playerRed.score)>=gameTypeWinScore && gameType != "" ) {
        // get the winning score
        let scoreWinner = Math.max(playerBlue.score, playerRed.score);
        // get the side of the player with the winning score
        let side = players.find(x => x.score === scoreWinner).side;
        // declare victory
        victory(side, "technical superiority");
    }
}

function criteria() {
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
            if (scoreRedLast > scoreBlueLast) {
                $(".red.score").css("text-decoration", "underline")
            } else if (scoreRedLast < scoreBlueLast) {
                $(".blue.score").css("text-decoration", "underline");
            }
            
            // read page 25 of regulation
        }
    } else {
        $(".score").css("text-decoration", "");
    }
}