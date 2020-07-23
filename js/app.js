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

var blueFirstName = "";
var blueLastName = "";
var redFirstName = "";
var redLastName = "";

var timerOn = false;

var timerInit = 0;

var phases = [ "1", "rest", "2"];
var phasePos = 0;
var phasesTime = [0,0,0];
var timeRest = 3; // should be 30 seconds

document.querySelector(".score.blue").textContent = scoreBlue;
document.querySelector(".score.red").textContent = scoreRed;
document.querySelector("#startTimer").disabled = true;



for (var i=0; i<arButtons.length;i++){
    arButtons[i].addEventListener("click", function() {

        var sideColour = this.parentElement.className;
        var addScore = Number(this.textContent.slice(1));
        switch(sideColour){
            case "blue buttonsRow":
                if (this.textContent.slice(0,1)==="+") {
                    scoreBlue = scoreBlue + addScore;
                } else if (this.textContent.slice(0,1)==="-" && scoreBlue > 0) {
                    scoreBlue = scoreBlue - addScore;
                }
                document.querySelector(".score.blue").textContent = scoreBlue;
                if(scoreBlue-scoreRed>=10){
                    victory("blue", "technical superiority")   ;
                }
                break;
            case "red buttonsRow":
                if (this.textContent.slice(0,1)==="+") {
                    scoreRed = scoreRed + addScore;
                } else if (this.textContent.slice(0,1)==="-" && scoreRed > 0) {
                    scoreRed = scoreRed - addScore;
                }
                document.querySelector(".score.red").textContent = scoreRed;
                if(scoreRed-scoreBlue>=10){
                    victory("red", "technical superiority")   ;
                }
                break;
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

        if (this.id==="setGame") {
            document.getElementById("playerInput").style.display = "flex";
        };

        if (this.id==="setConfirmGame") {
            if ( // check for empty fields
                document.getElementById("blueFirstName").value === ""
                || document.getElementById("blueLastName").value === ""
                || document.getElementById("redFirstName").value === ""
                || document.getElementById("redLastName").value === ""
                || radioCheck() === 0
            ) {
                    window.alert("Fill in all the names and game type!");

            } else {
                // close input area
                document.getElementById("playerInput").style.display = "none";

                // restart phase at Period 1
                phasePos = 0;
                setPhase(phasePos);

                // game type
                switch (radioCheckWhich()){
                    case 0:
                        document.getElementById("gameType").textContent = "Senior Freestyle";
                        // timerInit = 180;
                        timerInit = 5;
                        break;
                    case 1:
                        document.getElementById("gameType").textContent = "Junior Freestyle";
                        // timerInit = 120;
                        timerInit = 3;
                        break;
                    case 2:
                        document.getElementById("gameType").textContent = "Senior Greco-Roman";
                        // timerInit = 180;
                        timerInit = 5;
                        break;
                }

                // timer setup
                document.querySelector("#timer").innerHTML = Math.floor(timerInit/60).toString() + ":00";
                document.getElementById("startTimer").innerHTML = "▶";
                document.querySelector("#startTimer").disabled = false;
                timerOn = false;
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
            }
        };

        if (this.id === "startTimer"){
            if (timerOn === false) { // to pause the time
                document.getElementById("startTimer").innerHTML = "▐ ▌";
                timerOn = true;
                timer(timerInit); // 2 minutes is 120 seconds = 120 000 milliseconds

            } else if (timerOn === true)  { // to restart the time
                document.getElementById("startTimer").innerHTML = "▶";
                timerOn = false;
                timer(0);
            };
        };

        if (this.className === "timer" && this.id !== "startTimer"){
            switch(this.id){
                case "resetTimerRest":
                    timerInit = 60;
                    break;
                case "resetTimerJunior":
                    timerInit = 120;
                    break;
                case "resetTimerSenior":
                    timerInit = 180;
                    break;
                case "resetTimerTest":
                    timerInit = 3;
                    break;
            };

            document.querySelector("#timer").innerHTML = Math.floor(timerInit/60).toString() + ":00";
            document.getElementById("startTimer").innerHTML = "▶";
            timerOn = false;
            document.querySelector("#startTimer").disabled = false;
        };
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

function radioCheck() {
    var radioCheckSum = 0;
    for (var i=0; i<document.getElementsByName("gameType").length; i++) {
        radioCheckSum = radioCheckSum + document.getElementsByName("gameType")[i].checked
    }
    return radioCheckSum
}

function radioCheckWhich () {
    var radioCheckArray = [];
    for (var i=0; i<document.getElementsByName("gameType").length; i++) {
        radioCheckArray.push( document.getElementsByName("gameType")[i].checked )
    }
    return radioCheckArray.indexOf(true)
}

function setPhase(pos) {
    document.querySelector("#period").innerHTML = "Period " + phases[pos];
}

for (var i=0; i <= arPeriod.length; i++) {
    arPeriod[i].addEventListener("click", function() {
        document.querySelector("#period").innerHTML = "Period " + this.value;
    });
}


function timer(time) {
    
    // fix up the variable scopes here

    var start = new Date().getTime();
    var now = 0;
    console.log("start: "+start);
    
    var interval = setInterval( function() {
        
        // timer on start
        if (timerOn === true) {
            now = Math.ceil((time*1000-(new Date().getTime()-start))/1000);
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
            phasePos++;
            if (phasePos<3) {
                setPhase(phasePos);
                timer(phasesTime[phasePos]);
                console.log(timerInit);
            } else {
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
