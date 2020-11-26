module.exports = mat;

const matchesToHtml = require(process.cwd()+'/database/matchesToHtml');

function mat(req, res, mysql, db, mat) {
    let conn = mysql.createConnection(db);
    conn.connect();
    let whichMat = mat;
    let query = `SELECT * FROM matchesRaw WHERE mat = "${whichMat}"`;
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;
        let table = matchesToHtml(rows);
        res.render('table', {
            title: 'Matches',
            table: table
        })
        console.log(rows);
    });
    
    conn.end();
}