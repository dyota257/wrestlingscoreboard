
const express    = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const app        = express();

const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const db = require('./database/db.js')();

// HOME
app.route('/')
    .get((req, res) => {
        res.sendFile(`${__dirname}/index.html`);
        console.log('/home: ' + app.get('tournamentId'));
    });

// SCOREBOARD
app.route('/scoreboard')
    .get((req, res) => {
        res.sendFile(`${__dirname}/scoreboard.html`);
    });

// TOURNAMENTS
// use app variable app.use('tournamentId'), retrieve with app.get('tournamentId')

const history = require('./routes/tournaments/history.js');
const setup = require('./routes/tournaments/setup.js')();
const open = require('./routes/tournaments/open.js');

app.set('tournamentId', -1);

app.route('/tournaments/history')
    .get(async (req, res) => {
        history(req, res, mysql, db, req.app.get('tournamentId'));
        console.log('history/ tournamentId: ' + req.app.get('tournamentId'));
    })

app.route('/tournaments/setup')
    .get(async (req,res) => {
        setup[0](req, res, mysql,db);
    })
    .post(async (req,res) => {
        setup[1](req, res, mysql,db);
    });

app.route('/tournaments/open')
    .get(async (req,res) => {
        
        open(req, res, mysql,db);
        
        app.set('tournamentId',  req.query.id);
        console.log('/open tournamentId: ' + app.get('tournamentId'));
    })

app.route('/tournaments/openHome')
    .get(async (req,res) => {
        res.redirect('/tournaments/open?id='+app.get('tournamentId'))
    })

// MATCHES
const mat = require('./routes/matches/mat.js');
const matches_import = require('./routes/matches/matches_import.js');
const records = require('./routes/matches/records.js');

app.route('/matches/matA')
    .get(async (req, res) => {
        mat(req,res,mysql,db,"A")
    });

app.route('/matches/matB')
    .get(async (req, res) => {
        mat(req,res,mysql,db,"B")
    });

app.route('/matches/records')
    .post(async (req,res) => {
        records(req, res, mysql, db)
        console.log(req.body);
    })

// WRESTLERS
const all = require('./routes/wrestlers/all.js')
const wrestlers_import = require('./routes/wrestlers/wrestlers_import.js')

app.route('/wrestlers/all')
    .get(async (req, res) => {
        all(req,res,mysql,db)
    });

app.route('/wrestlers/import')
    .post(async (req, res) => {
        wrestlers_import(req,res,mysql,db);
    });

app.route('/matches/import')
    .post(async (req, res) => {
        matches_import(req,res,mysql,db);
    });

// SQL INTERFACE
app.route('/query')
    .get((req,res) =>{
        res.render('query', );
    })
    .post(async (req, res) => {
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

