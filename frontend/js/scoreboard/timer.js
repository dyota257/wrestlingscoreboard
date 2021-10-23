function setPhase(pos) {
    $("#period").html("Period " + phases[pos]);
}

function secondsToClock(seconds){
    //used to format the clock displays
    let date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(15, 4);
}

function startTimer() {
    window.location = '#main-display'
    if(timerOn === false) { // to restart the time
        $("#startTimer").html('<i class="fas fa-pause"></i>');
        timerOn = true;
        timer(now); // 2 minutes is 120 seconds = 120 000 milliseconds
        if(shotClockTimerOn === true){ //continue shotclock if it was on during the pause
            shotClockTimer(nowShotClock);
            shotClockPaused = false;
        }
        $(".middle").css("backgroundColor", "black");
        
        ['#resetGameRow','#importArea','#playerInput','#fixturesTable','nav','#mainHeader',].forEach((e)=>{
            displayNone(e)
        })

    } else if (timerOn === true)  { // to pause the time
        $("#startTimer").html("▶");
        timerOn = false;
        timer(now);
        $(".middle").css("backgroundColor", "grey");
        ['#resetGameRow','nav','#mainHeader'].forEach((e)=>{
            displayFlex(e)
        })
    };
}

function timer(time) {
    
    let start = new Date().getTime();
    
    // console.log(`start: ${start}`);
    
    var interval = setInterval( function() {
        
        // timer on start
        if (timerOn === true) {
            now = Math.ceil(
                ( time*1000 - (new Date().getTime()-start) )/1000
            );
            $("#timer").html(secondsToClock(now));

            shotClockTimer()
        };

        // timer on end
        if( now <= 0 && timerOn === true) {
            
            
            // move to the next phase
            phasePos++;
            if (phasePos<3) {
                // play sound
                new Audio("/sounds/airhorn.mp3").play();
                // if it's still in the game, set the next phase
                setPhase(phasePos);
                // pause the clock
                startTimer(phasesTime[phasePos]);
                // timer(phasesTime[phasePos]);
            } else {
                new Audio("/sounds/airhorn.mp3").play();
                // it must be the end of the game, close things down
                console.log(`it must be the end of the game, close things down`)
                $("#startTimer").prop("disabled", true);
                $('#announcevictory').css('visibility', 'visible');
                clearInterval(interval);
            }
        };

        // timer pause
        if( now <= 0 || timerOn === false) {
            // console.log("Timer stopped at: "+now);
            clearInterval(interval);
            now = time;
        };

        // console.log("now: "+Math.ceil(now));

    },1000);
    
};

function shotClockTimer(time) {
    // time in seconds, returns nothing 

    let start = new Date().getTime();
    
    // console.log(`shotClockTimerstart: ${start}`);
    // $(".shotclock").html(secondsToClock(time));
    
    // let interval = setInterval( function() {
        
        // timer on start
        if (shotClockTimerOn) {
            nowShotClock = now - nowOffset;
            $(".shotclock").html(secondsToClock(nowShotClock));
        };

        // score occured during shotclock
        if(!shotClockTimerOn && nowShotClock > 0){
            // clearInterval(interval);
            $(".shotclock").css("visibility","hidden"); //hide shot clock on timer end
            shotClockTimerOn = false;
            shotClockPlayer = null;
        }

        // timer on end
        if( nowShotClock <= 0 && shotClockTimerOn) {
            // clearInterval(interval);
            $(".shotclock").css("visibility","hidden"); //hide shot clock on timer end
            switch(shotClockPlayer){
                case 'blue':
                    redScoreUpdate(1); //other player gets the point
                    break;
                case 'red':
                    blueScoreUpdate(1);
                    break;
            }
            shotClockTimerOn = false;
            shotClockPlayer = null;
        };

        if((now <= 0 || !timerOn) && shotClockTimerOn) { //pause shot clock when round time paused. 
            console.log(`Timer stopped at: ${nowShotClock}`);
            clearInterval(interval);
            shotClockPaused = true;
        };

        // console.log("nowShotClock: "+Math.ceil(nowShotClock));

    // other end of setInterval
    // },1000);
    
}