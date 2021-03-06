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

}

let playerBlue = new Player(
    "blue", 
    "blueFirstName",
    "blueLastName",
    "blueClubName",
    0,
    [], 
    0,
    false
);
let playerRed = new Player(
    "red", 
    "redFirstName",
    "redLastName",
    "redClubName",
    0,
    [], 
    0,
    false
);

let players = [playerBlue, playerRed];
// this is a test
let side = "red";
players.find(x => x.side === side).firstName; // "Carol"