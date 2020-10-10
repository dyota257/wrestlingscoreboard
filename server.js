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

});


app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));

