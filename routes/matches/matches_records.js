module.exports = matches_records;

async function matches_records(req, res, mysql, db) {
    let conn = mysql.createConnection(db);
    

    conn.connect();

    let query = `SELECT DISTINCT id, date, title FROM tournaments;`

    await conn.query(query, (err, rows, fields) => {
        let tournaments = [];

        let options = `<option value=''></options>`;
        
        for(var i=0; i<rows.length; i++) {
            let tournamentTitle = rows[i].date.getFullYear() + ' ' + rows[i].title;
            options = options + `<option value='${rows[i].id}'>${tournamentTitle}</options>`
        }
        
        dropdownTournaments = `<select id='tournaments'>
                ${options}
            </select>`

    })

    query = `SELECT DISTINCT red_name, blue_name FROM matches_records;`

    var distinctNames = '';
    var dropdownNames = '';

    await conn.query(query, (err, rows, fields) => {
        let names = [];

        for(var i=0; i<rows.length; i++) {
            names.push(rows[i].red_name);
        }
        
        for(var i=0; i<rows.length; i++) {
            names.push(rows[i].blue_name);
        }

        distinctNames = [...new Set(names)].sort();
        
        let options = `<option value=''></options>`;
        
        for(var i=0; i<distinctNames.length; i++) {
            options = options + `<option value='${distinctNames[i]}'>${distinctNames[i]}</options>`
        }
        console.log();
        dropdownNames = `<select id='names'>
                ${options}
            </select>`

    })

       
    
    query = `SELECT * FROM matches_records ORDER BY id DESC`;  

    await conn.query(query, (err, rows, fields) => {
        if (err) {
            res.send(err)
        } else {
            
            let table = `
                <tr class='header'>
                    <th>Id</th>
                    <th style='display:none;'>Tournament</th>
                    <th>Red</th>
                    <th></th>
                    <th>Blue</th>
                    <th></th>
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
                    <td style='display:none;' name='tournament'>${row.tournament}</td>
                    <td ${redWinner}>${row.red_name} (${row.red_club})</td>
                    <td>${row.red_score === null ? '' : row.red_score}</td>
                    <td ${blueWinner}>${row.blue_name} (${row.blue_club})</td>
                    <td>${row.blue_score=== null ? '' : row.blue_score}</td>
                    <td>${row.age}</td>
                    <td>${row.gender}</td>
                    <td>${style}</td>
                    <td>${row.weight}</td>
                    <td>${row.time_clock}</td>
                    <td style='text-align:center;'>${row.class_points_red}</td>
                    <td style='text-align:center;'>${row.class_points_blue}</td>
                </tr>`
                
                arr.push(rows[i].red_name);
                arr.push(rows[i].blue_name);
            }

            table = '<table class="table" id="records">' + table + '</table>'
            
            res.render('records', {
                title: `Records`,
                names: dropdownNames,
                tournaments: dropdownTournaments,
                table: table
            })

        }
        
        
    });
    
    conn.end();
}