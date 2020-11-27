
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
const {setupGet, setupPost} = require('./routes/tournaments/setup.js');
const open = require('./routes/tournaments/open.js');

app.set('tournamentId', -1);

app.route('/tournaments/history')
    .get((req, res) => {history(req, res, mysql, db, req.app.get('tournamentId'));})

app.route('/tournaments/setup')
    .get((req,res) => {setupGet(req, res, mysql,db);})
    .post((req,res) => {setupPost(req, res, mysql,db);});

app.route('/tournaments/open')
    .get((req,res) => {
        open(req, res, mysql,db);
        app.set('tournamentId',  req.query.id);
        console.log('/open tournamentId: ' + app.get('tournamentId'));
    })

app.route('/tournaments/openHome')
    .get((req,res) => {
        if (app.get('tournamentId')>0) {
            res.redirect('/tournaments/open?id='+app.get('tournamentId'))
        } else {
            res.render('error', {
                title: 'Error!',
                errorMessage: `Can't find what you're looking for! There is no tournament open at the moment. Set a new one up <a href="/tournaments/setup">here</a>, or go to an existing one <a href="/tournaments/history">here</a>. 
                `
            })
        }
    })

// MATCHES
const fixtures = require('./routes/matches/fixtures.js');
const matches_import = require('./routes/matches/matches_import.js');
const records = require('./routes/matches/records.js');

app.route('/matches/fixtures')
    .get((req, res) => {fixtures(req,res,mysql,db,req.query.mat)});

app.route('/matches/records')
    .post((req,res) => {records(req, res, mysql, db)});

app.route('/matches/import')
    .get((req,res)=>{ 
        res.render('import', {
            mat: req.query.mat
        })
    })
    .post((req, res) => {
        // res.send('POST for mat ' + req.query.mat)
        matches_import(req,res,mysql,db);
    });

// WRESTLERS
const all = require('./routes/wrestlers/all.js')
const wrestlers_import = require('./routes/wrestlers/wrestlers_import.js')

app.route('/wrestlers/all')
    .get((req, res) => {all(req,res,mysql,db)});

app.route('/wrestlers/import')
    .post(async (req, res) => {
        wrestlers_import(req,res,mysql,db);
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
            if (err) {res.send('Error! Try again. <br><br>' + err)} else {
                res.send(rows);
                console.log(rows);
            }
        });
        conn.end();
    })

app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));

