// document.addEventListener("keydown", (e) => {
//     switch(e) {
//         case ""
//     }
// });

window.onbeforeunload = () => {
    return "Are you sure?"
}


var scoreBlue = 0;
var scoreRed = 0;
var arButtons = document.querySelectorAll("button");
var arPeriod = document.getElementsByName("period");
var gameType = "";

var blueFirstName = "";
var blueLastName = "";
var redFirstName = "";
var redLastName = "";

var timerOn = false;
var timerInit = 0;
var timerPause = 0;
var now = 0;

var phases = [ "1", "rest", "2"];
var phasePos = 0;
var phasesTime = [0,0,0];
var timeRest = 30; // should be 30 seconds

document.querySelector(".score.blue").textContent = scoreBlue;
document.querySelector(".score.red").textContent = scoreRed;
document.querySelector("#startTimer").disabled = true;

document.addEventListener("keydown", (e) => {
    
    if (e.keyCode == 32 && document.querySelector("#startTimer").disabled == false) {
        e.preventDefault();
        startTimer(now);
        console.log("timerInit: "+timerInit);
    }

    if (timerOn == true) {
        switch (e.keyCode) {
            case 65:
                scoreBlue = scoreBlue +5;
                break;
            case 83:
                scoreBlue = scoreBlue +4;
                break;
            case 68:
                scoreBlue = scoreBlue +2;
                break;
            case 70:
                scoreBlue = scoreBlue +1;
                break;
            case 71:
                if (scoreBlue!==0){scoreBlue = scoreBlue -1;}
                break;
            case 72:
                if (scoreRed!==0){scoreRed = scoreRed -1;}
                break;
            case 74:
                scoreRed = scoreRed +1;
                break;
            case 75:
                scoreRed = scoreRed +2;
                break;
            case 76:
                scoreRed = scoreRed +4;
                break;
            case 59:
                scoreRed = scoreRed +5;
                break;
        }
        document.querySelector(".score.blue").textContent = scoreBlue;
        document.querySelector(".score.red").textContent = scoreRed;
    }

    console.log(e.keyCode);
})


for (var i=0; i<arButtons.length;i++){
    arButtons[i].addEventListener("click", function() {

        var sideColour = this.parentElement.className;
        var addScore = Number(this.textContent.slice(1));

        switch(sideColour){
// Blue scoring buttons
            case "blue buttonsRow":
                
                if (this.textContent.slice(0,1)==="+") {
                    scoreBlue = scoreBlue + addScore;
                } else if (this.textContent.slice(0,1)==="-" && scoreBlue > 0) {
                    scoreBlue = scoreBlue - addScore;
                }
                document.querySelector(".score.blue").textContent = scoreBlue;

                // Freestyle tech sup
                if(scoreBlue-scoreRed>=10 && gameType.indexOf("Freestyle")>0 ){
                    victory("blue", "technical superiority");
                } else 
                // Greo tech sup
                if (scoreBlue-scoreRed>=8 && gameType.indexOf("Greco")>0) {
                    victory("blue", "technical superiority");
                }

                break;
// Red scoring buttons            
                case "red buttonsRow":
                if (this.textContent.slice(0,1)==="+") {
                    scoreRed = scoreRed + addScore;
                } else if (this.textContent.slice(0,1)==="-" && scoreRed > 0) {
                    scoreRed = scoreRed - addScore;
                }
                document.querySelector(".score.red").textContent = scoreRed;

                // Freestyle tech sup
                if(scoreRed-scoreBlue>=10 && gameType.indexOf("Freestyle")>0){
                    victory("red", "technical superiority")   ;
                } else 
                // Greo tech sup
                if (scoreRed-scoreBlue>=8 && gameType.indexOf("Greco")>0) {
                    victory("red", "technical superiority");
                }

                break;
// Blue and red other buttons                
            case "blue warning":
                document.querySelector(".markerWarning.blue").textContent = document.querySelector(".markerWarning.blue").textContent + "⭕";
                break;
            case "red warning":
                document.querySelector(".markerWarning.red").textContent = document.querySelector(".markerWarning.red").textContent + "⭕";
                break;
            case "blue pin":
                victory("blue", "pin");
                break;
            case "red pin":
                victory("red", "pin");
                break;
            case "middle reset":
                document.querySelector(".score.blue").textContent = 0;
                document.querySelector(".score.red").textContent = 0;
                document.querySelector(".markerWarning.blue").textContent = "";
                document.querySelector(".markerWarning.red").textContent = "";
                break;
            default:
                null;
                break;
        };

// Set game
        if (this.id==="setGame") {
            document.getElementById("playerInput").style.display = "flex";
        };

// Confirm game
        if (this.id==="setConfirmGame") {
            document.getElementById("blueFirstName").value === "";
            document.getElementById("blueLastName").value === "";
            document.getElementById("redFirstName").value === "";
            document.getElementById("redLastName").value === "";
            gameType = "";
            gameType = dropdownsCheckWhich()[0] + ", "+ dropdownsCheckWhich()[1] + ", " + document.querySelector("select[name=weight]").value;

            if ( // check for empty fields
                document.getElementById("blueFirstName").value === ""
                || document.getElementById("blueLastName").value === ""
                || document.getElementById("redFirstName").value === ""
                || document.getElementById("redLastName").value === ""
                || document.querySelector("select[name=weight]").value === ""
                // || radioCheck() === 0
            ) {
                    window.alert("Fill in all the names and game type!");

            } else {
                // close input area
                document.getElementById("playerInput").style.display = "none";

                // restart phase at Period 1
                phasePos = 0;
                setPhase(phasePos);

                // game type
                if (dropdownsCheckWhich()[0]=="Junior Freestyle") {
                    timerInit = 120;
                } else { // for Senior Freestyle and Senior Greco-Roman
                    timerInit = 180;
                }
                
                document.getElementById("gameType").textContent = gameType;

                // timer setup
                document.querySelector("#timer").innerHTML = Math.floor(timerInit/60).toString() + ":00";
                document.getElementById("startTimer").innerHTML = "▶";
                document.querySelector("#startTimer").disabled = false;
                timerOn = false;
                now = timerInit;
                phasesTime = [timerInit, timeRest, timerInit];
                
                // set player names
                blueFirstName = document.getElementById("blueFirstName").value;
                blueLastName = document.getElementById("blueLastName").value;
                redFirstName = document.getElementById("redFirstName").value;
                redLastName = document.getElementById("redLastName").value;
                document.querySelector(".blue.firstName").textContent = blueFirstName;
                document.querySelector(".blue.lastName").textContent = blueLastName;
                document.querySelector(".red.firstName").textContent = redFirstName;
                document.querySelector(".red.lastName").textContent = redLastName;

                // set scores
                scoreBlue = 0;
                scoreRed = 0;
                document.querySelector(".score.blue").textContent = scoreBlue;
                document.querySelector(".score.red").textContent = scoreRed;
            }
        };

//Reset game
        if (this.id==="resetGame") {
            var confirm = window.confirm("Are you sure? This will reset all scores and reset the timer.");
            console.log(confirm);
            if (confirm) {
                document.querySelector("#playerInput").style.display = "none";
                scoreBlue = 0;
                document.querySelector(".score.blue").textContent = scoreBlue;
                document.querySelector(".blue.firstName").textContent = "blueFirstName";
                document.querySelector(".blue.lastName").textContent = "blueLastName";
                scoreRed = 0;
                document.querySelector(".score.red").textContent = scoreRed;
                document.querySelector(".red.firstName").textContent = "redFirstName";
                document.querySelector(".red.lastName").textContent = "redLastName";
                
                document.querySelector("#timer").innerHTML = "0:00";
                gameType = "";
            }
        };

// Start timer
        if (this.id === "startTimer"){
            startTimer(now);
        };

        // if (this.className === "timer" && this.id !== "startTimer"){switch(this.id){case "resetTimerRest":timerInit = 30;break;case "resetTimerJunior":timerInit = 120;break;case "resetTimerSenior":timerInit = 180;break;case "resetTimerTest":timerInit = 3;break;};document.querySelector("#timer").innerHTML = Math.floor(timerInit/60).toString() + ":00";document.getElementById("startTimer").innerHTML = "▶";timerOn = false;document.querySelector("#startTimer").disabled = false;};
    })
}

document.getElementsByClassName("close")[0].addEventListener("click", function() {
        document.getElementsByClassName("popup")[0].style.display = "none";
    }
)

document.getElementById("download").addEventListener("click", function(){
    console.log("Click download.");
    exportTableToCSV("numbers.csv");
});

function dropdownsCheckWhich() {
    const ageDiv = document.querySelector("select[name=age]").value;
    const styleDiv = document.querySelector("select[name=style]").value;
    var gameType = "";
    if (styleDiv == "Greco-Roman") {
        gameType = "Senior Greco-Roman";
    } else if (ageDiv == "18-20 yrs" || ageDiv == "21yrs+") {
        gameType = "Senior Freestyle";
    }  else {
        gameType = "Junior Freestyle";
    }
    const styleAndAge = [gameType, ageDiv];
    return styleAndAge
}

function setPhase(pos) {
    document.querySelector("#period").innerHTML = "Period " + phases[pos];
}

for (var i=0; i <= arPeriod.length; i++) {
    arPeriod[i].addEventListener("click", function() {
        document.querySelector("#period").innerHTML = "Period " + this.value;
    });
}


function startTimer(now) {
    if (timerOn === false) { // to restart the time
        document.getElementById("startTimer").innerHTML = "▐ ▌";
        timerOn = true;
        timer(now); // 2 minutes is 120 seconds = 120 000 milliseconds
        document.getElementsByClassName("middle")[0].style.backgroundColor = "black";

    } else if (timerOn === true)  { // to pause the time
        document.getElementById("startTimer").innerHTML = "▶";
        timerOn = false;
        timer(now);
        document.getElementsByClassName("middle")[0].style.backgroundColor = "grey";
    };
}

function timer(time) {
    
    // fix up the variable scopes here

    var start = new Date().getTime();
    
    console.log("start: "+start);
    
    var interval = setInterval( function() {
        
        // timer on start
        if (timerOn === true) {
            now = Math.ceil(
                ( time*1000 - (new Date().getTime()-start) )/1000
            );
            var colonZero = ":";
            // timerInit = now;
            if ((now%60).toString().length === 1) { 
                colonZero = ":0";
            } else {
                colonZero = ":";
            }
            document.querySelector("#timer").innerHTML = Math.floor(now/60).toString() + colonZero + (now%60).toString();
        };

        // timer on end
        if( now <= 0 && timerOn === true) {
            // move to the next phase
            phasePos++;
            if (phasePos<3) {
                // if it's still in the game, start the clock again
                setPhase(phasePos);
                timer(phasesTime[phasePos]);
                console.log(timerInit);
            } else {
                // it must be the end of the game, close things down
                document.querySelector("#startTimer").disabled = true;
                var winBlue = (scoreBlue - scoreRed)/Math.abs(scoreBlue - scoreRed)
                switch ( winBlue ){
                    case 1:
                        victory("blue", "points");        
                        break;
                    case -1:
                        victory("red", "points");        
                        break;
                    default:
// Draw outcome
                        victory("draw", "technical superiority");
                        console.log("Outcome is draw")      
                        break;
                }
                clearInterval(interval);
            }
        };

        // timer pause
        if( now <= 0 || timerOn === false) {
            console.log("Timer stopped at: "+now);
            clearInterval(interval);
            now = time;
        };

        console.log("now: "+Math.ceil(now));

    },1000);
    
};


function victory(side, method) {
    document.getElementsByClassName("popup")[0].style.display = "flex";
    document.getElementsByClassName("popup")[0].style.height = document.body.clientHeight;
    var winnerName = "";
    switch (side) {
        case "blue":
             winnerName = blueFirstName +" "+blueLastName;
            document.getElementsByClassName("popup-text")[0].textContent = winnerName +" wins by "+ method +"!";
            document.getElementsByClassName("popup-content")[0].style.background = side;
            break;
        case "red":
             winnerName = redFirstName +" "+redLastName;
            document.getElementsByClassName("popup-text")[0].textContent = winnerName +" wins by "+ method +"!";
            document.getElementsByClassName("popup-content")[0].style.background = side;
            break;
        case "draw":
            document.getElementsByClassName("popup-text")[0].textContent = "Draw!";
            document.getElementsByClassName("popup-content")[0].style.background = "black";
            break;
        default:
        break;
    }

    // add the rows of table here. 

    var matchResults = document.querySelector("table.results>tbody")
    var newRow = 
        "<td>"+blueFirstName+" "+blueLastName+"</td>"
        +"<td>"+redFirstName+" "+redLastName+"</td>"
        +"<td>"+scoreBlue+"</td>"
        +"<td>"+scoreRed+"</td>"
        +"<td>"+winnerName+"</td>"
        +"<td>"+method+"</td>";

    matchResults.innerHTML = matchResults.innerHTML + newRow;
    
};

function downloadCSV(csv, filename) {
    console.log("Start exportTableToCSV");
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
    console.log("End exportTableToCSV");
};

function exportTableToCSV(filename) {
    console.log("Start exportTableToCSV");
    var csv = [];
    var rows = document.querySelectorAll("table.results tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
    console.log("End exportTableToCSV");
};


// function radioCheck() {
//     var radioCheckSum = 0;
//     for (var i=0; i<document.getElementsByName("gameType").length; i++) {
//     radioCheckSum = radioCheckSum + document.getElementsByName("gameType")[i].checked
//     }
//     return radioCheckSum
// }

// function radioCheckWhich () {
//     var radioCheckArray = [];
//     for (var i=0; i<document.getElementsByName("gameType").length; i++) {
//         radioCheckArray.push( document.getElementsByName("gameType")[i].checked )
//     }
//     return radioCheckArray.indexOf(true)
// }