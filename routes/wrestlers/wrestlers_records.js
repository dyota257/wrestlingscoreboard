module.exports = wrestlers_records;

async function wrestlers_records(req, res, mysql, db) {
    let conn = mysql.createConnection(db);
    

    conn.connect();

    let query = `SELECT DISTINCT red_name, blue_name FROM matches_records;`

    var distinctNames = '';
    var dropdown = '';
    await conn.query(query, (err, rows, fields) => {
        let names = [];

        for(var i=0; i<rows.length; i++) {
            names.push(rows[i].red_name);
        }
        
        for(var i=0; i<rows.length; i++) {
            names.push(rows[i].blue_name);
        }

        distinctNames = [...new Set(names)].sort();
        
        var options = `<option value=''></options>`;
        
        for(var i=0; i<distinctNames.length; i++) {
            options = options + `<option value='${distinctNames[i]}'>${distinctNames[i]}</options>`
        }
        console.log();
        dropdown = `<select id='names'>
            ${options}
        </select>`

    })

       
    
    query = `SELECT * FROM matches_records`;  

    await conn.query(query, (err, rows, fields) => {
        if (err) {
            res.send(err)
        } else {
            
            let table = `
                <tr class='header'>
                    <th>Id</th>
                    <th>Red</th>
                    <th>Blue</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Style</th>
                    <th>Weight</th>
                    <th>Time</th>
                    <th>Class. pts red</th>
                    <th>Class. pts blue</th>
                </tr>
            `;
            let arr = [];
            
            for(var i=0; i<rows.length; i++) {
                let row = rows[i];
                console.log(row);
                
                let redWinner = '';
                let blueWinner = '';
                row.winner === 'red' ? redWinner = 'style="color: red;"' : blueWinner = 'style="color: blue;"'
                
                let style = row.style.length === 0 ? 'Freestyle' : row.style;

                table = table + 
                `<tr>
                    <td>${row.id}</td>
                    <td ${redWinner}>${row.red_name}</td>
                    <td ${blueWinner}>${row.blue_name}</td>
                    <td>${row.age}</td>
                    <td>${row.gender}</td>
                    <td>${style}</td>
                    <td>${row.weight}</td>
                    <td>${row.time_clock}</td>
                    <td>${row.class_points_red}</td>
                    <td>${row.class_points_blue}</td>
                </tr>`
                
                arr.push(rows[i].red_name);
                arr.push(rows[i].blue_name);
            }

            table = '<table class="table" id="records">' + table + '</table>'
            
            res.render('records', {
                title: `Records`,
                names: dropdown,
                table: table
            })

        }
        
        
    });
    
    conn.end();
}