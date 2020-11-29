module.exports = fixtures;

const matchesToHtml = require(process.cwd()+'/database/matchesToHtml');

function fixtures(req, res, mysql, db) {
    let conn = mysql.createConnection(db);
    conn.connect();
    let whichMat = req.params.mat;
    let query = `SELECT * FROM matches_temp WHERE mat = "${whichMat}"`;
    conn.query(query, (err, rows, fields) => {
        if (err) {
            res.send(`Can't find the table for mat ${whichMat}`)
        } else {
            let table = matchesToHtml(rows);
            res.render('table', {
                title: `Matches - Mat ${whichMat}`,
                table: table
            })
            console.log(rows);
        }
        
        
    });
    
    conn.end();
}