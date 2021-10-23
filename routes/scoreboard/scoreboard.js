module.exports = scoreboard;

const matchesToHtml = require(process.cwd()+'/database/matchesToHtml');

async function scoreboard(req,res,mysql,db, tournamentId)  {

    let conn = mysql.createConnection(db);
    conn.connect();
    
    let whichMat = req.params.mat;
    let query = `SELECT * FROM matches_temp WHERE mat = "${whichMat}"`;
    
    let warning = '';

    if(tournamentId === -1) {
        warning = `
            <script>
                window.alert('Make sure you pick a tournament!')
            </script>
        `
    }

    await conn.query(query, (err, rows, fields) => {
        if (err) {
            res.render('scoreboard', {
                table: `Can't find the table for mat ${whichMat}`
            })
        } else {
            let table = matchesToHtml(rows);
            res.render('scoreboard', {
                mat              : whichMat,
                table            : table,
                tournamentWarning: warning,
                tournamentId     : tournamentId
            })
            // console.log(rows);
        }
        
    });
    
    conn.end();

}