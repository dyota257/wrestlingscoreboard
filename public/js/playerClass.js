class Player {
    constructor(
        side,
        firstName,
        lastName,
        clubName,
        score,
        scoreHist,
        warnings,
        shotClock
    ) {
        this.side      = side;
        this.firstName = firstName;
        this.lastName  = lastName;
        this.clubName  = clubName;
        this.score     = score;
        this.scoreHist = scoreHist;
        this.warnings  = warnings;
        this.shotClock = shotClock;
    }

    scoreUpdate() {
        // update the score
    }
}

const playerBlue = new Player(
    "blue", 
    "blueFirstName",
    "blueLastName",
    "blueClubName",
    10,
    [], 
    0,
    false
);
const playerRed = new Player(
    "red", 
    "redFirstName",
    "redLastName",
    "redClubName",
    10,
    [], 
    0,
    false
);

const players = [playerBlue, playerRed];
let side = "red";
players.find(x => x.side === side).firstName; // "Carol"