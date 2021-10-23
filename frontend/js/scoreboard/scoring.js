const scoresMap = [ -1, 1, 2, 4, 5];

$(document).keydown( (e) => {
    
    const blueKeysMap = [72, 74, 75, 76, 59]; // [H, J, K, L, ;]
    const redKeysMap = [71, 70, 68, 83, 65];  // [G, F, D, S, A]

    let addScore = 0;
    
    // any other key (not spacebar)
    if (e.keyCode != 32 && timerOn == true) {

        if (blueKeysMap.includes(e.keyCode)){
            addScore = scoresMap[blueKeysMap.indexOf(e.keyCode)];
            updateScore("blue", addScore);
        }

        if (redKeysMap.includes(e.keyCode)){
            addScore = scoresMap[redKeysMap.indexOf(e.keyCode)];
            updateScore("red", addScore);
        }
    }
})

function updateScore(side, addScore) {
    // get the clone player of the correct side
    let i; if (side === 'blue') { i = 0} 
    else if (side === 'red') {i = 1}
    let player = players[i]

    // add score
    if (addScore < 0 && player.score === 0 ||  gameType === ""){
        // do nothing
        console.warn('updateScore() is in the do nothing condition')
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

    if (Math.abs(playerBlue.score-playerRed.score) >= gameTypeWinScore && gameType != "") {
        unhide('#announcevictory');
    } else {
        hide('#announcevictory');
    }
};

function criteria() {
    scoreRedMax = Math.max(...playerRed.scoreHist);
    scoreRedLast = playerRed.scoreHist[playerRed.scoreHist.length-1];
    scoreBlueMax = Math.max(...playerBlue.scoreHist);
    scoreBlueLast = playerBlue.scoreHist[playerBlue.scoreHist.length-1];
    if(playerRed.score == playerBlue.score) {
        if (scoreRedMax > scoreBlueMax) {
            underline(".red.score");
        } else if (scoreRedMax < scoreBlueMax) {
            underline(".blue.score");
        } else if (scoreRedMax == scoreBlueMax)  {
            // pick the more recent one and take 
            if (scoreRedLast > scoreBlueLast) {
                underline(".red.score");
            } else if (scoreRedLast < scoreBlueLast) {
                underline(".blue.score");
            }
            
            // read page 25 of regulation
        }
    } else {
        noDecorate(".score");
    }
};

