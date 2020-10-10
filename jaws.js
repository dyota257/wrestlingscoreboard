const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
app.use(bodyParser.urlencoded({extended: true}));

const  mysql = require('mysql');
const jaws = {
    host:    'ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user:'mdfdk2xmgu4500zk',
    password:'qhqpr7cnzm27w6kt',
    port:    '3306',
    database:'tdp5wp392ohvymoc'
};

var connection = mysql.createConnection(jaws);


app.get('/', async (req, res) => {
    connection.connect();
    let query = `SELECT * FROM wrestlers`;
    connection.query(query, function(err, rows, fields) {
      if (err) throw err;
      console.log(rows);
    });
    
    connection.end();
   
});

app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));