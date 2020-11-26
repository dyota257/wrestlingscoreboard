module.exports = history;

// function history() { console.log(process.cwd())};

const tournamentsToHtml = require(process.cwd()+'/database/tournamentsToHtml');

function history(req, res, mysql, db) {
    let conn = mysql.createConnection(db);
    conn.connect();
    let query = 'SELECT * FROM tournaments';
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;
        let table = tournamentsToHtml(rows);
        res.render('table', {
            title: 'Tournaments',
            table: table
        })
        console.log(rows);
    });
    conn.end();
}
