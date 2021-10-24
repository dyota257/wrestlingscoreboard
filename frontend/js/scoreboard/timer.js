$(document).keydown( (e) => {
    // spacebar
    if (
        e.keyCode == 32 
        && $("#startTimer").prop("disabled") == false 
        && $('#playerInput').css('display') === 'none'
    ) {
        // don't enter a "space" character if it's not in text input mode
        // preventDefault to stop scrolling only works on keydown, not keyup
        e.preventDefault();
        $('button.timer').click()
        console.log("timerInit: " + timerInit);
        console.log(now)
    }
})

function setPhase(pos) {
    $("#period").html("Period " + phases[pos]);
    $("#timer").html(secondsToClock(timerInit));
}

function secondsToClock(seconds){
    //used to format the clock displays
    let date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(15, 4);
}

function timerFlickerIcon() {
    let icon = '';
    timerOn ? icon = '▶' : icon = '<i class="fas fa-pause"></i>'
    $("#startTimer").html(icon);
}

function timerFlickerDisable() {
    // Multiple inputs to the timer, within the interval period, will cause multiple intervals to run at the same time
    // Disable the control for 1000 ms (the interval period) to prevent this
    disable('button.timer')
    setTimeout(()=>{undisable('button.timer')}, 1000)
}

function pauseGraphics() {
    $(".middle").css("backgroundColor", "grey");
    ['#resetGameRow','nav','#mainHeader'].forEach((e)=>{
        displayFlex(e)
    })
}

function pressTimer() {
    
    // graphics
        window.location = '#main-display'
        timerFlickerDisable()
        timerFlickerIcon();

    // logic
    if(timerOn === false) { // to restart the time
        // logic
            timerOn = true;
            timer(now); // 2 minutes is 120 seconds = 120 000 milliseconds
            if(shotClockTimerOn === true){ //continue shotclock if it was on during the pause
                shotClockTimer(nowShotClock);
                shotClockPaused = false;
            }
        
        // graphics
            $(".middle").css("backgroundColor", "black");
            ['#resetGameRow','#importArea','#playerInput','#fixturesTable','nav','#mainHeader', 'footer'].forEach((e)=>{
                displayNone(e)
            })

    } else if (timerOn === true)  { // to pause the time
        // logic
            timerOn = false; // the interval function runs wver second - it will pick this up and stop the countdown 

        // graphics
            pauseGraphics();
    };
}

function timer(time) {
    
    let start = new Date().getTime();
    
    let interval = setInterval(() => {
        
        log(`Inside interval, now = ${now}`)

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
            if (phasePos < 2) {
                // logic
                new Audio("/sounds/airhorn.mp3").play(); // play sound
                pressTimer();       // pause the clock
                now = timerInit     // set up timer for next round

                // graphics
                setPhase(phasePos); // if it's still in the game, set the next phase    
                
            } else {
                // it must be the end of the game, close things down
                console.log(`it must be the end of the game, close things down`)
                
                // logic
                clearInterval(interval);
                new Audio("/sounds/airhorn.mp3").play();
                
                // graphics
                disable("#startTimer");
                $("#period").html("End");
                $("#timer").html(secondsToClock(0));
                unhide('#announcevictory');
                pauseGraphics();
            }
        };

        // timer pause
        if( now <= 0 || timerOn === false) {
            clearInterval(interval);
        };

    },1000);
    
};

