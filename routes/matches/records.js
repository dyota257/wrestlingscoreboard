module.exports = records;

async function records(req, res, mysql, db, tournamentId) {
    let conn = mysql.createConnection(db);
    
    conn.connect();
    // let maxTournamentId = 0;
    // Pick the last tournamentId
    // let query = 'SELECT MAX(id) AS id FROM tournaments;'
    
    query = `
        DELETE FROM matches_temp WHERE (mat = "${req.body.mat}" AND id = ${req.body.matchID});
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
        )`
    .replace(/\n/g, "")
    .replace(/  /g, "");

    console.log(query);

    await conn.query(query, (err, rows, fields) => {
        if (err) {
            res.send(err)
        } else {
            console.log('Write query: ' + query)
            res.redirect('/scoreboard/' + req.body.mat)
        }
    });

    conn.end();

    
    // Delete the match from the fixture
    
    // if(req.body.matchID.length > 0) {
    //     console.log(req.body.matchID);
    //     console.log('This match is not on the fixtures')
    //     let query = `DELETE FROM matches_temp WHERE (mat = "${req.body.mat}" AND id = ${req.body.matchID})`;
        
    //     console.log(query);
        
    //     await conn.query(query, (err, rows, fields) => {
    //         if (err) {
    //             res.send(err)
    //         }
    //     });
    // }
    

    // write the record 
    // No need to write id - it will auto-increment
    
 
    
    
    // res.send(req.body);
}