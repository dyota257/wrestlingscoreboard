# Objectives
 - Have functioning writeback record-keeping functionality
 - Have good styling and presentation
 - Make fixes according to feedback

# Plan

## Week 1

### Refresh memory
[ ] Review app performance
[x] Check live app on Heroku.com
[x] Review Githhub repo
    [x] Update Readme if needed
[ ] List out all of the things it could do
[ ] Write out to-do list
[ ] Write out objectives
[ ] Straighten out spreadsheet format with Erica

[ ] Do refactoring work on scoreboard

[ ] Check if scores actually update correctly



#### Refresh memory: notes
- Refactoring player class
    - There is something to be done in the function updateScore in scoreboard.js
    - Need to check if scores update correctly

- Path to writing back
    1. Scoreboard triggers route matches/records
        from popup.ejs
    2. records.js 
        a. deletes the current match from matches_temp (fixtures)
        b. sends records
        c. ends connection
        d. NEEDS TO TO SOMETHING, route back somewhere sensible

#### Refresh memory: questions

? Where is the point at which writeback needs to happen on scoreboard.js?
A: This happens on popup.ejs

? What is the structure of the database?
A: This is described in summary.yaml

### 