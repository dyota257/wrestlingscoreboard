// this is for Digital Oceans

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mariadb = require('mariadb');
const app = express();

const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

const jaws = {
    host: 'ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'mdfdk2xmgu4500zk',
    password: 'qhqpr7cnzm27w6kt',
    port: '3306',
    database: 'tdp5wp392ohvymoc'
};


const maria = {
    host: "127.0.0.1", // On blackbox
    // host: "localhost", // on linux laptop
    user: "root", 
    password: "",
    insecureAuth: true,
    database: "wrestling"
};

const db = jaws;

// expose an endpoint "tournaments"
app.get('/', (req, res) => {
	let conn = mysql.createConnection(db);
    conn.connect();

	// ALTER USER "root"@"localhost" IDENTIFIED WITH mysql_native_password BY ""; 
    let query = 'SHOW TABLES';
    
    conn.query(query, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
    
	conn.end();
	
});



app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));

