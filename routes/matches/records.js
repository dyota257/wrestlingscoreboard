module.exports = records;

async function records(req, res, mysql, db) {
    let conn = mysql.createConnection(db);
    conn.connect();

    // Delete the match from the fixture
    
    if(req.body.matchID.length > 0) {
        console.log(req.body.matchID);
        console.log('This match is not on the fixtures')
        let query = `DELETE FROM matches_temp WHERE (mat = "${req.body.mat}" AND id = ${req.body.matchID})`;
        
        console.log(query);
        
        await conn.query(query, (err, rows, fields) => {
            if (err) {
                res.send(err)
            } else {
                res.redirect(`/scoreboard/${req.body.mat}`);
            }
        });
    }
    

    // write the record 
    query = `INSERT INTO matches_records VALUES (
        "id"
        "tournament"
        "red"
        "blue"
        "winner"
        "class_points"
        "age"
        "gender"
        "style"
        "weight"
        "time_start"
        "time_end"
        "time_clock"
    )`;

    console.log(query);

    
    // await conn.query(query, (err, rows, fields) => {
    //     if (err) {
    //         res.send("Something is wrong with this record - go back")
    //     } else {
    //         res.send(query);
    //     }
    // });
    
    conn.end();
    // res.send(req.body);
}