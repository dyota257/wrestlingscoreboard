function shotclock(side) {
    log('shotclock!')
    if(shotClockTimerOn) {
        false; // can't give them a shot clock warning if the shotclock is already on or the time hasn't started yet
    } else if(now < shotClockTime) {
        false; // can't give them a shot clock if less than shotclock time
    } else if (!timerOn) {
        unhide(`.${side}.shotclock`);
    } else if(!shotClockTimerOn) {
        unhide(`.${side}.shotclock`);
        shotClockPlayer = players.find(x => x.side === side).side;
        shotClockTimerOn = true;
        nowOffset = now - 30;
        // console.log(nowOffset);
    }
};

function shotClockTimer() {

    /* 
        This function does not have its own interval, but instead piggybacks on the **existing clock interval**.
        This way, the clock intervals are directly in sync. 
    */

    // timer on start
    if (shotClockTimerOn) {
        nowShotClock = now - nowOffset;
        $(".shotclock").html(secondsToClock(nowShotClock));
    };

    // score occured during shotclock
    if(!shotClockTimerOn && nowShotClock > 0){
        // clearInterval(interval);
        hide(".shotclock") //hide shot clock on timer end
        shotClockTimerOn = false;
        shotClockPlayer = null;
    }

    // timer on end
    if( nowShotClock <= 0 && shotClockTimerOn) {
        // clearInterval(interval);
        hide(".shotclock") //hide shot clock on timer end
        switch(shotClockPlayer){
            case 'blue':
                updateScore('red', 1); //other player gets the point
                break;
            case 'red':
                updateScore('blue', 1);
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

}