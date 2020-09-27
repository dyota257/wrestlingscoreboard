function setPhase(pos) {
    $("#period").html("Period " + phases[pos]);
}

function startTimer(now) {
    if (timerOn === false) { // to restart the time
        $("#startTimer").html('<i class="fas fa-pause"></i>');
        timerOn = true;
        timer(now); // 2 minutes is 120 seconds = 120 000 milliseconds
        $(".middle").css("backgroundColor", "black");
        $('#resetGameRow').css("display", "none");
        $('#importArea').css("display", "none");
        $('#playerInput').css("display", "none");
        $('#fixturesTable').css("display", "none");

    } else if (timerOn === true)  { // to pause the time
        $("#startTimer").html("▶");
        timerOn = false;
        timer(now);
        $(".middle").css("backgroundColor", "grey");
        $('#resetGameRow').css("display", "flex");
        
    };
}

function timer(time) {
    
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
            $("#timer").html(Math.floor(now/60).toString() + colonZero + (now%60).toString());
        };

        // timer on end
        if( now <= 0 && timerOn === true) {
            
            // play sound
            new Audio("sounds/airhorn.mp3").play();
            // move to the next phase
            phasePos++;
            if (phasePos<3) {
                // if it's still in the game, set the next phase
                setPhase(phasePos);
                startTimer(phasesTime[phasePos]);
                // timer(phasesTime[phasePos]);
            } else {
                // it must be the end of the game, close things down
                $("#startTimer").prop("disabled", true);
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