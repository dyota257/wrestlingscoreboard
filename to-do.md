# SmoothComp era:
The site is on Render.com (https://wrestlingwa.onrender.com/)
Every tournament: 
- update smoothcomp.ejs and smoothcomp_announcer.ejs with the newest smoothcomp mat URLs
- push to GitHub
- pushing to GitHub will automatically push to Render.com


# To-do list
## From November tournament
[ ] it would be easier to click on the row of the table and immediately set the matchID to that row
[ ] Underline is wrong
[ ] Period 1 sometimes jumps to End
    * this happens when page isn't refreshed e.g. to avoid refreshing
* Arash says to be faster with the scores. How to allow this?
[ ] Put in a custom time if something bad happened with the clock
[ ] Hide scoreboard in game setup to not confuse people as to what to look at
[ ] if there is match that is like 26a, HANDLE IT. Turn it into a 0.1

## from night before nevember tournament
[ ] when the local DB is used (Maria) for testing, tournamentWarning is not defined. Why?? Everything is OK again when connected to Jaws. 
[ ] make the local Maria db mirror the production one and prefill it with data
Root problem: 
    [x] Because there are no longer dropdown selectors, the post-match logic (after pressing the "announc victory" "Save results' button) will not work
        [x] To fix this, need to make sure that the page is getting refreshed every time, but not have to send things to the server.
            To keep things moving along, delete the most recent match just like normal
                [x] To test this, need to connect to the local database so can try out 

## From officiating training
[ ] Set up tournament is weird, objects not appearing in time after selecting options
[x] After restarting clock from pause, it goes back to 3 mins
[ ] How to make the whole scoreboard SCALE to the viewport?

## From George Samios Cup August 2021

[x] Take out rest period 30s.
    This is not useful. The refs keep their own rest time. If this gets missed, then it can't be skipped. 
[X] Take out the connection to the server - no need to save results. 
    Jack says that there is a problem. When click "Save Result", it brings an error Cannot GET Scoreboard. Something was wrong with the server. 
    This error could only have happened if the browser was requesting /scoreboard, without a parameter (e.g. it wasn't scoreboard/A)
    This was solved by redirecting /scoreboard to /scoreboard/A
[x] Take out the mandatory weights that have to be filled in before a match can be confirmed.
    This doesn't matter. It only matters for the master database of records, but that isn't something that we need. 
    Conditions are set in setConfirmGame()
[/] Replace timing code with a premade JS library
    Timer for period 2 was misbehaving, showing two different timers. 
    FIXED IT MYSELF
[ ] Get another tablet device
    The view angle is not wide enough
[x] Sound check button
[x] remove warnings

# Last time...
Check that game type (FS/ GR) and SP Senior / SP Junior are working

changing database records for consistency

[x] get rid of temporary match table underneath
[x] Make controls smaller
[x] weight selector broken: fixed, style name changed (Fresstyle -> FS, Greco-Roman -> GR)
[x] Makes last names bigger
[x] Fixtures up and down
[x] People want to see club name on fixtures
[x] Warning squares not showing
[x] on pause, hide all of the navbar
[x] put disqualification state as part of reset
___

[ ] What if we need to change the current match, and don't want to delete the next one?
    [ ] Make an "outside of fixtures" options

[ ] fixtures bugs out if no names are tHERE
    [x] Need a way to fetching the match id
    [x] Two connections in a row isn't working

[x] Check if records.js works
    [x] make it route somewhere else after it's done

[ ] Make records page
    [ ] Select wrestler
    [ ] View record (all matches)
    [ ] Total class_points

[ ] matches_temp table structure is wrong
    - it will be veryy hard to look up records by wrestler
    - need to rework structure so that EACH ROW is one wrestler, with own class_points
    - at the end of every match, post two rows: one for blue, one for red

[ ] records.js
    - Logic for this hasn't been written yet. The SQL query is just a placeholder.

[x] put console log in matches import to catch error

## Misc
[ ] <datalist> element has no event listeners, can't use in the same way as <select>
[x] ctrl enter as press button
[x] Exhibitions? Remember to mark them correctly somehow
    [x] Or have a category for "exhbitions" and have a choice of a 2-min or a 3-min match

[x] Tech sup victory DON'T STOP THE CLOCK
[x] Victory - tell the timekeeper if they want to accounce victory or not

[ ] End time is not important information

[x] Resize popup

[x] Rearrange player name and club section on scoreboard

[x] airhorn isn't working - fix this. 

[ ] highlight the currently ongoing match
    [ ] Need a param on scoreboard for matchID

[ ] search box to highlight when your matches are

## CSS


[ ] import only the required Bulma modules
[x] Style addon buttons on fixtures page
[x] One QR code (one route for match fixtures)
    [x] On-page toggle for Mat A/Mat B
[/] Insert a line in between? For when people pull out of matches

### Scoreboard
[ ] fix nav bar colours
[ ] nav bar on hover not enough contrast - maybe put black background
[ ] Shot clock positioning - overlap with score

## misc

[x] scoring buttons are broken
[x] key map under keys
[/] password at /import to prevent other people from entering stuff during the match
    hid the other nav bar items in mobile mode
[x] organise JS files
    [x] client-side
        [x] scoreboard
        [x] others
    [x] server-side

[x] break up scoreboard into different partials

## Tournament manager
### Passing data
[x] Store match results in matches_records

### ROUTING
This server.js file is getting really big and disorganised. Organise it.
[x] Create routes folder

### Create tournament
[x] Once finished doing the tournament setup, make a screen for "this tournament" 
    [x] Flesh out "this tournament"
[x] Clear up main screen
[x] Date format in tournament display



## misc
[ ] Put in a forfeit condition

[x] ctrl+enter on query

[ ] The play button gets confused / runs two timers if start button is pressed in rapid succession

[x] Space button is blocked from doing anything else except play/pause. Need to have active space button for editing import textarea.
[x] Change firstname lastname clubname separations to look for spaces; e.g. Jake Raymon Criddle has three names, the program picked up the wrong names
    * new rules
        1. anything within brackets is the club name
        2. anything before the first space is the first name
        3. the rest is the lastname
 ?  Insert new rows into the imported 
    [x] Keep textarea text, don't clear it
    [x] upon re-import, "ClearCollect()" the HTML table. This is how the organisers can "insert" rows in between, for special matches or for bracket outcomes
[x] sound on timerend
[x] pause clock on timerend

## Refactoring scoreboard
[x] Refactor resets into a function
[x] Refactor colour buttons class names
[x] comment out/delete console.logs on timers

[ ] Rework how classes are assigned in scoreboard elements
    [ ] Refactor behaviour

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
[x] Repackage so that it's easily accessible for normal people (put all of the other files into folders, rename index.html to something stupidly obvious like launch.html)
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
