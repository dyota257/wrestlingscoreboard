module.exports = matches_import;

const importMatches = require(process.cwd()+'/database/importMatches');

async function matches_import(req, res, mysql, db) {
    
    let values = importMatches(req.body.x);
    
    let whichMat = req.params.mat;
    console.log(whichMat);
    let conn = mysql.createConnection(db);
    conn.connect();
    console.log("Connected...");

    let clearTable = `DELETE FROM matches_temp WHERE mat = "${whichMat}"`

    await conn.query(clearTable);

    console.log(`Mat ${whichMat} fixtures cleared.`);

    query = `INSERT IGNORE INTO matches_temp (
        category,
        round,
        mat,
        id,
        red_name,
        red_firstname,
        red_lastname,
        red_fullname,
        red_club,
        blue_name,
        blue_firstname,
        blue_lastname,
        blue_fullname,
        blue_club
        ) VALUES ${values}`
        .replace(/\n/g, "")
        .replace(/  /g, "");
        
    console.log('Attempt query ' + query);
       
    await conn.query(query, (err, rows, fields) => {
        if (err) {
            console.error("ERROR - WRITE INTO DATABASE FAILED");
            res.render('notif', {
                title: 'Error!',
                message: `Something went wrong. The current fixtures for mat ${whichMat} has been erased, but the new fixtures wasn't written in. The fixtures are now blank. `,
                error: `<b>Error message</b>: ${err.sqlMessage} <br>
                <b>SQL query</b>: <br> ${err.sql}`
            });
        } else {
            console.log("Query successful. Table 'matches_temp' populated.");
            res.render('notif', {
                title: 'Success!',
                message: `Fixtures have been updated. <br> Click <a href="/matches/fixtures">here</a> to view fixtures.`,
                error: ''
            })
        }
    });

    
    
    conn.end();



}
