const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const app = express();
const port = 8080;

const importWrestlers = require('./importWrestlers');
const importMatches = require('./importMatches');
const matchesToHtml = require('./matchesToHtml');
const wrestlersToHtml = require('./wrestlersToHtml');



app.use(bodyParser.urlencoded({extended: true}));

// expose an endpoint "tournaments"
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/tournaments', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        var query = "select * from tournaments";
        var rows = await conn.query(query);
        res.send(rows);

    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

app.get('/matchesRaw', async (req, res) =>{
    let conn;
    try {
        conn = await pool.getConnection();
        var query = "select * from matchesRaw";
        var rows = await conn.query(query);
        var table = matchesToHtml(rows);
        res.send(table);

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
        res.send(table);

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


app.listen(port, () => console.log(`Listening on port ${port}`));

