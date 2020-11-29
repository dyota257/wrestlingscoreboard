module.exports = matches_import;

const importMatches = require(process.cwd()+'/database/importMatches');

async function matches_import(req, res, mysql, db) {
    
    var values = importMatches(req.body.x);
    
    let conn = mysql.createConnection(db);
    conn.connect();
    console.log("Connected...");

    let clearTable = `DELETE FROM  matches_temp`

    await conn.query(clearTable);

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
        ) VALUES ${values}`;
    console.log(query);
    
    await conn.query(query);
    
    console.log("Query successful. Table 'matches_temp' populated.");
    
    conn.end();

    res.render('notif', {
        title: 'Success!',
        message: `Fixtures have been updated. <br> Click <a href="/matches/fixtures/${req.params.mat}">here</a> to view fixtures.`,
        error: ''
    })

}
