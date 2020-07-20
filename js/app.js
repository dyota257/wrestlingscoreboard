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
                break;
            case "red buttonsRow":
                if (this.textContent.slice(0,1)==="+") {
                    scoreRed = scoreRed + addScore;
                } else if (this.textContent.slice(0,1)==="-" && scoreRed > 0) {
                    scoreRed = scoreRed - addScore;
                }
                document.querySelector(".score.red").textContent = scoreRed;
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
            document.getElementById("playerInput").style.display = "block";
        };

        if (this.id==="setConfirmGame") {
            if (
                document.getElementById("blueFirstName").value === ""
                || document.getElementById("blueLastName").value === ""
                || document.getElementById("redFirstName").value === ""
                || document.getElementById("redLastName").value === ""
                || radioCheck() === 0
            ) {
                    window.alert("Fill in all the names and game type!");
            } else {
                document.getElementById("playerInput").style.display = "none";
                switch (radioCheckWhich()){
                    case 0:
                        document.getElementById("gameType").textContent = "Senior Freestyle";
                        break;
                    case 1:
                        document.getElementById("gameType").textContent = "Junior Freestyle";
                        break;
                    case 2:
                        document.getElementById("gameType").textContent = "Senior Greco-Roman";
                        break;
                }
                blueFirstName = document.getElementById("blueFirstName").value;
                document.querySelector(".blue.firstName").textContent = blueFirstName;
                blueLastName = document.getElementById("blueLastName").value;
                document.querySelector(".blue.lastName").textContent = blueLastName;
                redFirstName = document.getElementById("redFirstName").value;
                document.querySelector(".red.firstName").textContent = redFirstName;
                redLastName = document.getElementById("redLastName").value;
                document.querySelector(".red.lastName").textContent = redLastName;
            }
        };

        if (this.id==="resetGame") {
            if (window.confirm("Are you sure? This will reset all scores and reset the timer.")) {
                document.querySelector("#playerInput").style.display = none;
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
            if (timerOn === false) {
                document.getElementById("startTimer").innerHTML = "⏸";
                console.log("I'm here");
                timerOn = true;
                timer(timerInit, "start"); // 2 minutes is 120 seconds = 120 000 milliseconds
            } else if (timerOn === true)  {
                document.getElementById("startTimer").innerHTML = "▶";
                timerOn = false;
                timer(120, "stop");
                console.log("Timer is already running!");
            };
        };

        if (this.id === "popup") {
            document.getElementsByClassName("popup")[0].style.display = "flex";
            document.getElementsByClassName("popup")[0].style.height = document.body.clientHeight;
        }

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



for (var i=0; i <= arPeriod.length; i++) {
    arPeriod[i].addEventListener("click", function() {
        console.log(this.value);
        document.querySelector("#period").innerHTML = "Period " + this.value;
    });
}


function timer(time) {
    
    // fix up the variable scopes here

    var start = new Date().getTime();

    console.log("start: "+start);
    
    var interval = setInterval( function() {
        
        if (timerOn === true) {
            var now = Math.ceil((time*1000-(new Date().getTime()-start))/1000);
            var colonZero = ":";
            timerInit = now;
            if ((now%60).toString().length === 1) { 
                colonZero = ":0";
            } else {
                colonZero = ":";
            }
            document.querySelector("#timer").innerHTML = Math.floor(now/60).toString() + colonZero + (now%60).toString();
        };

        if( now <= 0 || timerOn === false) {
            console.log("Timer stopped at: "+now);
            clearInterval(interval);
        };

        console.log("now: "+Math.ceil(now));

    },1000); // the smaller this number, the more accurate the timer will be
    
};

function victory(side, method) {
    document.getElementsByClassName("popup")[0].style.display = "flex";
    document.getElementsByClassName("popup")[0].style.height = document.body.clientHeight;
    document.getElementsByClassName("popup-content")[0].style.background = side;
    switch (side) {
        case "blue":
            var winnerName = blueFirstName +" "+blueLastName
            break;
        case "red":
            var winnerName = redFirstName +" "+redLastName
            break;
        default:
        break;
    }
    document.getElementsByClassName("popup-text")[0].textContent = winnerName +" wins by "+ method +"!";
}