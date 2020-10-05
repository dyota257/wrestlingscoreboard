const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const app = express();
const port = 8080;

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
        res.send(rows[0].Blue);
        // res.send(()=>{
        //     for (let i=0; i<rows.length; i++) {
        //         `<li>${rows[i].Red} vs. ${rows[i].Blue}`
        //     }
        // });

    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

app.post('/', async (req, res) => {
    console.log(req.body.query);
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("in!");
        var query = "select * from matchesRaw where "+req.body.query;
        var rows = await conn.query(query);
        console.log("out!");
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

app.post('/add', async (req, res) => {
    
    let category = req.body.category;
    console.log(category);
    let round = req.body.round;
    console.log(round);
    let mat = req.body.mat;
    console.log(mat);
    let id = req.body.id;
    console.log(id);
    let red = req.body.red;
    console.log(red);
    let blue = req.body.blue;
    console.log(blue);

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

app.listen(port, () => console.log(`Listening on port ${port}`));