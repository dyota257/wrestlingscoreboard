module.exports = open;

const dateFormat = require(process.cwd()+'/database/dateFormat');

function open(req, res, mysql, db) {

    let id = req.query.id;
    
    let query = `SELECT * FROM tournaments WHERE id = ${id}`;

    let conn = mysql.createConnection(db);
    conn.connect();
    
    conn.query(query, (err, rows, fields) => {
        if (err) {
            res.render('notif', {
                title: 'Error!',
                message: `Can't find what you're looking for! There is no tournament open at the moment. Set a new one up <a href="/tournaments/setup">here</a>, or go to an existing one <a href="/tournaments/history">here</a>.`,
                error: `<p style="font-family:monospace;">Error message: ${err}</p>`
            })
            
        } else {
            let date = dateFormat(rows[0].date);
            let title = rows[0].title;
            let location = rows[0].location;
            
            res.render('open', {
                id: id,
                date: date,
                title: title,
                location: location
            })
        }
    });
    conn.end();
}

