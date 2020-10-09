module.exports = importWrestlers;

function importWrestlers(x) {
    // clear the array
    var wrestlers = [];
    
    var arr = x.split('\n');
    
    // take off the first row
    arr.splice(0,1);

    var newArr = [];

    for (i=0; i<arr.length;i++) {
        if( arr[i].trim().length >0 ) {
            newArr.push(arr[i]);
        }
    }

    var newWrestler = {};
    var namesArr;
    var last_name;
    var first_name;

    for (i=0; i<newArr.length;i++) {
        var rowtext = newArr[i];
        var row = rowtext.split('\t');

        namesArr = row[0].split(' ');

        last_name = namesArr.pop();
        first_name = namesArr.toString().replace(',', ' ');

        newWrestler = {
            first_name: first_name,
            last_name: last_name,
            gender: row[2].slice(0,1),
            club_name: row[4],
            full_name: (first_name.replace(' ', '')+last_name).toLowerCase()
        }
        
        wrestlers.push(newWrestler);
    }

    // clear the query text

    var sqlQuery = "";

    for (i=0; i<wrestlers.length;i++){
        sqlQuery = sqlQuery+`
        ("${wrestlers[i].first_name}","${wrestlers[i].last_name}","${wrestlers[i].gender}","${wrestlers[i].club_name}","${wrestlers[i].full_name}"),`
    }

    // chop off the last comma
    sqlQuery = sqlQuery.slice(0,sqlQuery.length-1);
            
    return sqlQuery;

}