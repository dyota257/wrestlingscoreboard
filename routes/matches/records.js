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
        "time_start TIME"
        "time_end TIME"
        "time_clock VARCHAR(30)"
    )`;
    
    conn.query(query, (err, rows, fields) => {
        if (err) {
            res.send("Something is wrong with this record - go back")
        } else {
            res.send(query);
        }
    });
    
    conn.end();
    console.log(req.body);
}