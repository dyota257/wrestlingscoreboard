module.exports = records;

// const matchesToHtml = require(process.cwd()+'/database/matchesToHtml');

function records(req, res, mysql, db) {
    let conn = mysql.createConnection(db);
    conn.connect();

    let query = `INSERT INTO matches_records VALUES (
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
    )`;
    
    conn.query(query, (err, rows, fields) => {
        if (err) {
            res.send("Something is wrong with this record - go back")
        }
        
        // throw err; don't throw
        
        res.send(query);
        // res.redirect('/scoreboard');
    });
    
    conn.end();
}