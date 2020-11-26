module.exports = wrestlers_import;

const importWrestlers = require(process.cwd()+'/database/importWrestlers');

function wrestlers_import(req, res, mysql, db) {
    let conn = mysql.createConnection(db);
    conn.connect();

    let values = importWrestlers(req.body.x);
    let query = `INSERT IGNORE INTO wrestlers (
        first_name, 
        last_name,
        gender,
        club_name,
        full_name
    ) VALUES ${values}`;
    
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;
        res.redirect('/');
        console.log(rows);
    });
    
    conn.end();
}