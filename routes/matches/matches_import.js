module.exports = matches_import;

const importMatches = require(process.cwd()+'/database/importMatches');

function matches_import(req, res, mysql, db) {
    
    var values = importMatches(req.body.x);
    res.send(values);
    
    // let conn = mysql.createConnection(db);
    // conn.connect();
    // console.log("Connected...");
    // query = `INSERT IGNORE INTO matches_open (
    //     category,
    //     round,
    //     mat,
    //     id,
    //     red_name,
    //     red_fullname,
    //     red_club,
    //     blue_name,
    //     blue_fullname,
    //     blue_club
    //     ) VALUES ${values}`;
    // console.log(query);
    // conn.query(query);
    // console.log("Query successful. Table 'matchesRaw' populated.");
    // res.redirect('/');
    // conn.end();
}
