$(document).keydown( (e) => {
    
    const blueKeysMap = [72, 74, 75, 76, 59]; // [H, J, K, L, ;]
    const redKeysMap = [71, 70, 68, 83, 65];  // [G, F, D, S, A]

    let addScore = 0;

    // spacebar
    if (
        e.keyCode == 32 
        && $("#startTimer").prop("disabled") == false 
        && $('#playerInput').css('display') === 'none'
    ) {
        // don't enter a "space" character if it's not in text input mode
        e.preventDefault();
        startTimer();
        console.log("timerInit: " + timerInit);
        console.log(now)
    }
    
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