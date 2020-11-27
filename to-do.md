# To-do list

## Tournament manager
### Passing data

[ ] Store match results in matches_records


### ROUTING
This server.js file is getting really big and disorganised. Organise it.
[x] Create routes folder

### Create tournament
[x] Once finished doing the tournament setup, make a screen for "this tournament" 
    [ ] Flesh out "this tournament"
[ ] Clear up main screen
[x] Date format in tournament display


## misc
[ ] Put in a forfeit condition

[ ] The play button gets confused / runs two timers if start button is pressed in rapid succession

[x] Space button is blocked from doing anything else except play/pause. Need to have active space button for editing import textarea.
[ ] Change firstname lastname clubname separations to look for spaces; e.g. Jake Raymon Criddle has three names, the program picked up the wrong names
    * new rules
        1. anything within brackets is the club name
        2. anything before the first space is the first name
        3. the rest is the lastname
 ?  Insert new rows into the imported 
    [ ] Keep textarea text, don't clear it
    [ ] upon re-import, "ClearCollect()" the HTML table. This is how the organisers can "insert" rows in between, for special matches or for bracket outcomes
[x] sound on timerend
[x] pause clock on timerend

## Refactoring scoreboard
[x] Refactor resets into a function
[x] Refactor colour buttons class names
[x] comment out/delete console.logs on timers

## Shotclock
[x] Make shot clock in sync with current time

[x] Make shotclock visible when timerOn = false (timer is paused).
    This is because the ref will blow the whistle, set the shot clock, and play will resume. 

[/] make reset function


## Scoring
[x] Rewrite win condition on updateScore()
[x] Rewrite victory.js to include players objects

## HTML
[x] Display timer clock \n
[x] Put confirm button on player input row
[x] put club name to be displayed

## CSS
[x] Style player input table

## JS
[x] make the shot clock background grey - the same grey as the paused timer bg colour
[x] warningsBlue and warningsRed are not being reset on Reset Game

[x] making a shot clock puts a warning marker on - do not want this
    this is because the button.onclick callback pcks up the class .warning - change this to pick up on an id #arning (or something)

[x] warning dq logic is gone? 
	3 warnings and you're out

[x] remove draw conditions - replace with victory on the last biggest score (criteria!)
    [x] Underline criteria
        if scoreBlue == scoreRed
        check who has the largest score
        else, check who has the most recent large score
    [x] start an array of score history
[x] Set all buttons to disabled when timer is off
[x] jQuery
[x] On reset, put up a warning "are you sure"?
[x] Put a timer on
    [x] Button start
    [x] Button pause
    [x] Button reset
[x] Init player input div as display:none;
[x] When Set Game is pressed...
    [x] player input div display:block;
    [x] when confirm button pressed, populate player names 
[x] FOCUS ON TIMER AND setPhase()
    [x] end the game on a pin
[x] add keyboard event listeners
    [x] make scoring into functions so that it can be called in multiple places
    [x] there's no limiter on scoring by keyboard - need to copy from buttons.
[x] white background on pause
[x] age and weight division display
[x] jquery dropdown.js
[x] 3 warnings lead to a disqualification
    [x] put in a counter for warnings
[x] KEYBOARD BUTTONS ARE BACKWARDS
[x] fill out defeat() function


## Import function
[x] Clash with individual input
    [x] program thinks the weights haven't been entered yet! Need to prompt for weights input for each match
[x] Onchange dropdowns weight isn't coming up when gender isn't onchange
[x] club names on indiv entry form

## What if....

- What if Erica could upload/copy paste the fixtures into a text fields, and the app parses that into the fixtures?

## Collin says...
[x] Declare winner when match is over
    [x] By who has the most points
    [x] Depending on game type (10 points freestyle, 8 points greco)
[x] Declare winner by pin
    [x] Have a button to stop the match, and set the winner
    [x] Note that victory was by pin
[x] Write results into an Excel file.



## Other things...

[x] What are the different victory conditions?

## Notes from the tournament
[x] Need a "live mode" or "tournament mode" where all of the control buttons are hidden while match is in progress
[x] Fix: the "reset all" button doesn't reset weights
 ?  Select match from fixture, by clicking on it?
 ?  autocomplete on names, based on what's been imported?
 ?  Block computer from going to sleep?

Next project..... programming a double-elim tournament

 !  Need to bring:
    USB for data transfer (spreadsheets, and to carry the source code files)
    Internet connection (to access the app online, if the USB can't be accessed)
    Set Power Settings to never sleep

[x] When setting game from the Set Game from, clubname is not transferred to the scoreboard
[x] Import textarea and fixtures are still visible when game is confirmed - hide this on confirm
[x] In some situations, game type is wrong. If it's not overridden upon confirmgame, the variable is still storing the previous match. This happens e.g. a Greco match happens, and the next one is a 6-7yo where there is no Greco => there is no Greco selector. But, the program still remembers the style as "Greco" and keeps it as that
[x] Put a ringing sound on timerend
[ ] Repackage so that it's easily accessible for normal people (put all of the other files into folders, rename index.html to something stupidly obvious like launch.html)
 ?  Single button for scoring? Less complicated?
    Can't have criteria detection for draws if this is the way
 ?  Separate timer clear and score clear?
 ?  Rest timer isn't timed in this tournament, the mat chairman just "feels it"
[x] Turn warning markers to yellow squares
[x] swap alignment for warning squares


## Notes from Collin Kerr 2020-09-10
[x] On clock start, hide all the forms
[x] On clock start, have # anchor to "jump" to
[x] Scoring categories in final results table (depending on win condition achieved)
[x] Make red and blue recolour in CSS file (so that red and blue can match poster
[-] wrestlingwa.org/rbl-mgmt

### Timekeeping clock
These clocks have 8 usable buttons:
* +1 score red
* -1 score red
* +1 score blue
* -1 score blue
* start/stop timer
* clear time
* clear score
* set time +1 minute
