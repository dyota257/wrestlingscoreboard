module.exports = all;

const wrestlersToHtml = require(process.cwd()+'/database/wrestlersToHtml');

function all(req, res, mysql, db) {
    let conn = mysql.createConnection(db);
    conn.connect();
    let query = "SELECT * from wrestlers";
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;
        let table = wrestlersToHtml(rows);
        res.render('table', {
            title: 'Wrestlers',
            table: table
        });
        console.log(rows);
    });
    
    conn.end();
}