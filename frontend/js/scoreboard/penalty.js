function warning(side) {
    switch(side) {
        case "red":
            playerX = playerRed;
            payerY = playerBlue;
            break;
        case "blue":
            playerX = playerBlue;
            payerY = playerRed;
            break;
    }
    if(playerX.warnings < 2) {
        updateWarnings();
    } else {
        updateWarnings();
        // the other side wins
        unhide('#announcevictory');
        disqualification = side;
    }

    function updateWarnings() {
        $(`.markerWarning.${side}`).append("■");
        playerX.warnings++;
    }
};