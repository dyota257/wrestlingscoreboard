module.exports = records;

async function records(req, res, mysql, db, tournamentId) {
    let conn = mysql.createConnection(db);
    
    conn.connect();
    // let maxTournamentId = 0;
    // Pick the last tournamentId
    // let query = 'SELECT MAX(id) AS id FROM tournaments;'
    
    query = `
        DELETE FROM matches_temp WHERE (mat = "${req.body.mat}" AND id = ${req.body.matchID});
    `
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