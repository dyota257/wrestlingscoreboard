class Player {
    constructor(
        side,
        firstName,
        lastName,
        clubName,
        score,
        warnings,
        shotClock
    ) {
        this.side      = side;
        this.firstName = firstName;
        this.lastName  = lastName;
        this.clubName  = clubName;
        this.score     = score;
        this.warnings  = warnings;
        this.shotClock = shotClock;
    }
}

const playerBlue = new Player();
const playerRed = new Player();

"https://stackoverflow.com/questions/1005857/how-to-call-a-function-from-a-string-stored-in-a-variable"