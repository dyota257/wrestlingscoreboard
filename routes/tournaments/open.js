module.exports = open;

const dateFormat = require(process.cwd()+'/database/dateFormat');

function open(req, res, mysql, db) {

    let id = req.query.id;
    
    let query = `SELECT * FROM tournaments WHERE id = ${id}`;

    // res.send(query);

    let conn = mysql.createConnection(db);
    conn.connect();
    
    conn.query(query, (err, rows, fields) => {
        if (err) {
            res.send("Can't find what you're looking for!")
        } ;
        // throw err; don't throw error and break the app
        
        let date = dateFormat(rows[0].date);
        let title = rows[0].title;
        let location = rows[0].location;
        
        res.render('tournament_open', {
            id: id,
            date: date,
            title: title,
            location: location
        })

    });
    conn.end();
}

