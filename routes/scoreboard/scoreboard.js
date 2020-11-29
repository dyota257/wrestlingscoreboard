module.exports = scoreboard;

const matchesToHtml = require(process.cwd()+'/database/matchesToHtml');

async function scoreboard(req,res,mysql,db)  {

    let conn = mysql.createConnection(db);
    conn.connect();
    
    let whichMat = req.params.mat;
    let query = `SELECT * FROM matches_temp WHERE mat = "${whichMat}"`;
    
    await conn.query(query, (err, rows, fields) => {
        if (err) {
            res.render('scoreboard', {
                table: `Can't find the table for mat ${whichMat}`
            })
        } else {
            let table = matchesToHtml(rows);
            res.render('scoreboard', {
                table: table
            })
            console.log(rows);
        }
        
    });
    
    conn.end();

}