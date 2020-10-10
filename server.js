const express = require('express');
const bodyParser = require('body-parser');
// const pool = require('./database/db');
const app = express();
const port = 8080;

const importWrestlers = require('./database/importWrestlers');
const importMatches = require('./database/importMatches');
const matchesToHtml = require('./database/matchesToHtml');
const wrestlersToHtml = require('./database/wrestlersToHtml');
const tournamentsToHtml = require('./database/tournamentsToHtml');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

// expose an endpoint "tournaments"
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});
app.get('/scoreboard', (req, res) => {
    res.sendFile(`${__dirname}/scoreboard.html`);
});

app.get('/tournaments', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        var query = "select * from tournaments";
        var rows = await conn.query(query);
        var table = tournamentsToHtml(rows);
        res.render('table', {
            title: 'Tournaments',
            table: table
        })

    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

app.get('/matchesA', async (req, res) =>{
    let conn;
    try {
        conn = await pool.getConnection();
        var query = 'SELECT * FROM matchesRaw WHERE mat = "A"';
        var rows = await conn.query(query);
        var table = matchesToHtml(rows);
        res.render('table', { 
            title: 'Matches',
            table: table
        })

    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

app.get('/matchesB', async (req, res) =>{
    let conn;
    try {
        conn = await pool.getConnection();
        var query = 'SELECT * FROM matchesRaw WHERE mat = "B"';
        var rows = await conn.query(query);
        var table = matchesToHtml(rows);
        res.render('table', { 
            title: 'Matches',
            table: table
        })

    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

app.get('/wrestlers', async (req, res) =>{
    let conn;
    try {
        conn = await pool.getConnection();
        var query = "select * from wrestlers";
        var rows = await conn.query(query);
        var table = wrestlersToHtml(rows);
        res.render('table', {
            title: 'Wrestlers',
            table: table
        });

    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

app.post('/add', async (req, res) => {
    
    let category = req.body.category;
    let round = req.body.round;
    let mat = req.body.mat;
    let id = req.body.id;
    let red = req.body.red;
    let blue = req.body.blue;
    
    console.log(`
        category: ${category},
        round:    ${round},
        mat:      ${mat},
        id:       ${id},
        red:      ${red},
        blue:     ${blue}
    `)

    let conn;
    try {
        conn = await pool.getConnection();
        console.log("in!");
        var query = `INSERT INTO matchesRaw VALUES (
            "${category}",
            "${round}",
            "${mat}",
            ${id},
            "${red}",
            "${blue}"
        )`;
       
        conn.query(query);
        console.log("out!");
        var rows = await conn.query(`SELECT * FROM matchesRaw WHERE id = ${id}`);
        res.send(rows);

    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
})

app.post('/importWrestlers', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("Connected...");
        console.log("Query successful. Table 'wrestlers' table cleared");
        var sqlQuery  = importWrestlers(req.body.x);
        console.log("Connected...");
        query = `INSERT IGNORE INTO wrestlers (
            first_name, 
            last_name,
            gender,
            club_name,
            full_name
        ) VALUES ${sqlQuery}`;
        console.log(query);
        conn.query(query);
        // var rows = await conn.query(`SELECT * FROM wrestlers`);
        console.log("Query successful. Table 'wrestlers' populated.");
        res.redirect('/');
        // res.send(rows);

    } catch (err) {throw err;} finally {if (conn) return conn.end();}

});

app.post('/importMatches', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        var sqlQuery  = importMatches(req.body.x);
        console.log("Connected...");
        console.log(sqlQuery);
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
            ) VALUES ${sqlQuery}`;
        console.log(query);
        conn.query(query);
        console.log("Query successful. Table 'matchesRaw' populated.");
        res.redirect('/');

    } catch (err) {throw err;} finally {if (conn) return conn.end();}

});


app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));

