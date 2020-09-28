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

    scoreUpdate() {
        // update the score
    }
}

const playerBlue = new Player("blue", "Dyota", "Tan");
const playerRed = new Player("red", "Carol", "But");
const players = [playerBlue, playerRed];
let side = "red";
players.find(x => x.side === side).firstName; // "Carol"
