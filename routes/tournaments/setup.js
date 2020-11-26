module.exports = setup;

const tournamentsToOptionsTitles = require(process.cwd()+'/database/tournamentsToOptionsTitles');
const tournamentsToOptionsLocations = require(process.cwd()+'/database/tournamentsToOptionsLocations');

function setup() {
    return [get, post];
}

function get(req, res, mysql, db) {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`

    let conn = mysql.createConnection(db);
    conn.connect();
    let query = 'SELECT title, location FROM tournaments';

    conn.query(query, (err, rows, fields) => {
        if (err) throw err;
        let optionsTitle = tournamentsToOptionsTitles(rows); 
        let optionsLocations = tournamentsToOptionsLocations(rows);
        res.render('tournament_setup', {
            optionsTitles: optionsTitle,
            optionsLocations: optionsLocations,
            today: todayString
        })

        console.log(rows);
    });

    conn.end();
}

function post(req, res, mysql, db) {
    let date = req.body.date;
    let title = '';
    let location = '';

    if (req.body.title === "Other") {
        title = req.body.otherTitle;
    } else {
        title = req.body.title;
    }

    if (req.body.location === "Other") {
        location = req.body.otherLocation;
    } else {
        location = req.body.location;
    }

    let query = `INSERT INTO tournaments (date,title,location) VALUES 
    ('${date}','${title}','${location}')`

    console.log(query);

    let check = 
        (
            req.body.title === ''
            || req.body.title === 'Other' && req.body.otherTitle === ''
        ) || (
            req.body.location === ''
            || req.body.location === 'Other' && req.body.otherLocation === ''
        )

    if (check) {
        res.send('Some information is missing. Go back and make sure that everything has been filled in correctly.');
    } else {
        
        // send to database
        let conn = mysql.createConnection(db);
        conn.connect();
        conn.query(query, (err, rows, fields) => {
            if (err) throw err;
            console.log(rows);
        });
        conn.end();

        res.redirect('/');
    }

}
