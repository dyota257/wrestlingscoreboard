// This was in victory.js in the frontend

    // Fill in the data to be POSTed to the 
    /* Don't bother with this anymore - this will post to the database, but no need for that. Reasons: 
        no longer any of the specific dropdowns to record results (age, gender, etc.)
        don't want to delete the current match in the fixtures on the database, just in case there is an 'outside the fixtures' match. `
    */  

    /* 
    $(".popup input[name=tournamentId]").val($("#tournamentId").text())
    $(".popup input[name=matchID]").val()
    $(".popup input[name=mat]").val($("select[name=mat]").val())
    
    $(".popup input[name=red]").val(playerRed.firstName + ' ' + playerRed.lastName)
    $(".popup input[name=blue]").val(playerBlue.firstName + ' ' + playerBlue.lastName)
    
    $(".popup input[name=red_club]").val(playerRed.clubName)
    $(".popup input[name=blue_club]").val(playerBlue.clubName)
    
    $(".popup input[name=red_score]").val(playerRed.score)
    $(".popup input[name=blue_score]").val(playerBlue.score)
    
    
    $(".popup input[name=winner]").val(side)
    switch(side) {
        case "red":
            $(".popup input[name=class_points_red]").val(class_points_winner);
            $(".popup input[name=class_points_blue]").val(class_points_loser);
            break;
        case "blue":
            $(".popup input[name=class_points_red]").val(class_points_loser);
            $(".popup input[name=class_points_blue]").val(class_points_winner);
            break;
    }
    $(".popup input[name=age]").val($("select[name=age]").val())
    $(".popup input[name=gender]").val(
        $("select[name=gender]").val().slice(0,1)
    )
    if($("select[name=style]").val ()=== "Greco-Roman") {
        $(".popup input[name=style]").val("GR");
    } else {
        $(".popup input[name=style]").val("FS");
    }
    $(".popup input[name=weight]").val($("select[name=weight]").val())
    // This input is populate on setConfirmGame
    // $(".popup input[name=time_start]").val()
    $(".popup input[name=time_end]").val(
        String(new Date().getHours()).padStart(2, "0")
        + ":" 
        + String(new Date().getMinutes()).padStart(2, "0")
    )
    $(".popup input[name=time_clock]").val($("#period").text() + ", " + $("#timer").text())
    */

// this used to be in routes.js (POST after announcing victory)
// forget about writing back to the database for now - records are kept outside of this anyway

/*
INSERT IGNORE INTO matches_records (
            tournament,
            red_name,
            blue_name,
            red_club,
            blue_club,
            red_score,
            blue_score,
            winner,
            class_points_red,
            class_points_blue,
            age,
            gender,
            style,
            weight,
            time_start,
            time_end,
            time_clock
        ) VALUES (
            ${req.body.tournamentId},
            "${req.body.red}",
            "${req.body.blue}",
            "${req.body.red_club}",
            "${req.body.blue_club}",
            ${req.body.red_score},
            ${req.body.blue_score},
            "${req.body.winner}",
            ${Number(req.body.class_points_red)},
            ${Number(req.body.class_points_blue)},
            "${req.body.age}",
            "${req.body.gender}",
            "${req.body.style}",
            "${req.body.weight}",
            "${req.body.time_start}",
            "${req.body.time_end}",
            "${req.body.time_clock}"
        )

*/ */