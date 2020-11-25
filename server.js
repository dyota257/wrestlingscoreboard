// this is for Heroku

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mariadb = require('mariadb'); //not called upon
const app = express();

const port = 8080;

const importWrestlers = require('./database/importWrestlers');
const importMatches = require('./database/importMatches');
const matchesToHtml = require('./database/matchesToHtml');
const wrestlersToHtml = require('./database/wrestlersToHtml');
const tournamentsToHtml = require('./database/tournamentsToHtml');
const tournamentsToOptionsTitles = require('./database/tournamentsToOptionsTitles');
const tournamentsToOptionsLocations = require('./database/tournamentsToOptionsLocations');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const jaws = {
    host: 'ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'mdfdk2xmgu4500zk',
    password: 'qhqpr7cnzm27w6kt',
    port: '3306',
    database: 'tdp5wp392ohvymoc'
};

const maria = {
    host: "127.0.0.1", 
    user: "root", 
    password: "",
    database: "wrestling"
};

const db = jaws;

// expose an endpoint "tournaments"
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});
app.get('/scoreboard', (req, res) => {
    res.sendFile(`${__dirname}/scoreboard.html`);
});

app.get('/tournamentSetup', async (req,res) => {
    
    const today = new Date();
    const todayString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`

    let conn = mysql.createConnection(db);
    conn.connect();
    let query = 'SELECT title, location FROM tournaments';

    conn.query(query, (err, rows, fields) => {
        if (err) throw err;
        let optionsTitle = tournamentsToOptionsTitles(rows); 
        let optionsLocations = tournamentsToOptionsLocations(rows);
        res.render('tournamentSetup', {
            optionsTitles: optionsTitle,
            optionsLocations: optionsLocations,
            today: todayString
        })

        console.log(rows);
    });

    conn.end();
});

app.post('/tournamentSetup', async (req,res) => {
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

})

app.get('/tournaments', async (req, res) => {
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
});

app.get('/matchesA', async (req, res) => {
    let conn = mysql.createConnection(db);
    conn.connect();
    let query = 'SELECT * FROM matchesRaw WHERE mat = "A"';
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
});

app.get('/matchesB', async (req, res) => {
    let conn = mysql.createConnection(db);
    conn.connect();
    let query = 'SELECT * FROM matchesRaw WHERE mat = "B"';
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
});

app.get('/wrestlers', async (req, res) => {
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

});

app.post('/importWrestlers', async (req, res) => {
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
});

app.post('/importMatches', async (req, res) => {
    let conn = mysql.createConnection(db);
    conn.connect();
    console.log("Connected...");
    var values = importMatches(req.body.x);
    console.log(values);
    query = `INSERT IGNORE INTO matchesRaw (
        category,
        round,
        mat,
        id,
        red_name,
        red_fullname,
        red_club,
        blue_name,
        blue_fullname,
        blue_club
        ) VALUES ${values}`;
    console.log(query);
    conn.query(query);
    console.log("Query successful. Table 'matchesRaw' populated.");
    res.redirect('/');
    conn.end();
});

app.get('/query', (req,res) =>{
    res.render('query', );
})

app.post('/query', async (req, res) => {
    console.log(req.body.query);
    const query = req.body.query;
    let conn = mysql.createConnection(db);
    conn.connect();
    console.log("Connected...");
    conn.query(query, (err, rows, fields) => {
        if (err) res.send('Error! Try again.')
        // throw err; // don't want to throw an error and break the app
        res.send(rows);
        console.log(rows);
    });
    conn.end();
})

app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));

