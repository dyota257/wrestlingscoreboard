// Set game - cancel set game
function setGame() {displayFlex("#playerInput")};

function cancelConfirmGame() {displayNone("#playerInput")}

function fixtures() {
    switch( $("#fixturesTable").css("display") ) {
        case "flex":
            displayNone("#fixturesTable");
            $("#fixtures").text("Fixtures 🔽");
            break;
        case "none":
            displayFlex("#fixturesTable");
            $("#fixtures").text("Fixtures 🔼");
            break;
    }
}

function setConfirmGame() {
    gameType = "";
    gameType = `${dropdownsCheckWhich()[0]}, ${dropdownsCheckWhich()[1]}, ${$("select[name=weight]").val()}`;
    $(".middle").css("backgroundColor", "black");

    if ( // check for empty fields
        
        (
            $("#blueFirstName").val()==""
            || $("#blueLastName").val()==""
            || $("#blueClubName").val()==""
            || $("#redFirstName").val()==""
            || $("#redLastName").val()==""
            || $("#redClubName").val()==""
            || $("select[name=weight]").val()==""
        ) && ageDiv.indexOf('SP') === -1
    ) {
        window.alert("Fill in all the names and game type!");
    } else {
        // close input area and fixtures
        displayNone("#playerInput");
        displayNone("#fixturesTable");

        // restart phase at Period 1
        phasePos = 0;
        setPhase(phasePos);

        // game type
        if (
            dropdownsCheckWhich()[0]=="Junior Freestyle"
            || dropdownsCheckWhich()[0]=="Exhibition: 2 mins"
        ) {
            timerInit = timeValue[1];
        } else { // for Senior Freestyle, Senior Greco-Roman, and Exhibition: 3 mins
            timerInit = timeValue[2];
        }

        timeRest = timeValue[0];
        
        $("#gameType").text(gameType);

        // timer setup
        $("#timer").html(Math.floor(timerInit/60).toString() + ":00");
        $("#startTimer").html("▶");
        $("#startTimer").prop("disabled", false);
        timerOn = false;
        shotClockTimerOn = false;
        now = timerInit;
        phasesTime = [timerInit, timeRest, timerInit];
        
        // set player names
        playerBlue = {...playerBlue,...{
                firstName: $("#blueFirstName").val(),
                lastName: $("#blueLastName").val(),
                clubName: $("#blueClubName").val()
            }
        };
        playerRed = {...playerRed,...{
                firstName: $("#redFirstName").val(),
                lastName: $("#redLastName").val(),
                clubName: $("#redClubName").val()
            }
        };

        players = [playerBlue, playerRed];

        $(".blue.firstName").text(playerBlue.firstName);
        $(".blue.lastName").text(playerBlue.lastName);
        $(".blue.clubName").text(playerBlue.clubName);
        $(".red.firstName").text(playerRed.firstName);
        $(".red.lastName").text(playerRed.lastName);
        $(".red.clubName").text(playerRed.clubName);

        // Mark the start time, ready to be POSTed
        
        $(".popup input[name=time_start]").val(
            String(new Date().getHours()).padStart(2, "0")
            + ':'
            + String(new Date().getMinutes()).padStart(2, "0")
        );


        // reset scores, warnings, shotclocks
        reset(true,true,true);
        hide('#announcevictory');
        disqualification = false;

        if (gameType.indexOf("Greco")>0) {
            gameTypeWinScore = 8;
        } else if (gameType.indexOf("Freestyle")>0) {
            gameTypeWinScore = 10;
        }
        
        // confirm and set up for records
        let inputMatchID = $('td[data-label="id"]')[matchOrder].textContent.trim();
        $("input[name='matchID']").val(inputMatchID);
        
        let path = window.location.pathname.split('/');
        $("input[name='mat']").val(path[2]);
    }
};

function resetGame() {
    var confirm = window.confirm("Are you sure? This will reset all scores and reset the timer.");
    
    if (confirm) {
        displayNone("#playerInput");
        
        // reset scores, warnings, shotclocks, gameType
        reset(true,true,true,true);
        hide('#announcevictory');
        disqualification = false;
        [".blue.firstName",".blue.lastName",".blue.clubName",".red.firstName",".red.lastName",".red.clubName"].forEach((e)=>{
            $(e).text(e);
        })
        
        $("#timer").html("0:00");
    }
};