module.exports = wrestlers_records;

async function wrestlers_records(req, res, mysql, db) {
    let conn = mysql.createConnection(db);
    
    conn.connect();
    
    let query = `SELECT * FROM matches_records`;
    
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

            let names = [...new Set(arr)];
            
            res.render('table', {
                title: `Records`,
                table: table
            })

        }
        
        
    });
    
    conn.end();
}