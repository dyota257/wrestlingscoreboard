module.exports = importMatches;

function importMatches(x) {
    
    var arr = x.split('\n')

    var newArr = [];

    for (i=0; i<arr.length;i++) {
        if( arr[i].trim().length >0 ) {
            newArr.push(arr[i]);
        }
    };
    
    var category = "";
    var round = "";
    var mat = "";
    var id = 0;

    var red_name = "";
    var red_club = "";
    var blue_name = "";
    var blue_club = "";

    var matches=[];

    for (i=0; i<newArr.length;i++) {
        var rowtext = newArr[i];
        var row = rowtext.split('\t');

        category = row[0];
        round = row[1];
        mat = row[2];
        id = Number(row[3]);

        // red
        red_name = row[4].split(/\(/)[0].trim();
        arr_red_name = red_name.split(' ');
        red_lastname = arr_red_name.pop();
        red_firstname = arr_red_name.join(' ');


        red_club = row[4].split(/\(/)[1];
        if (red_club !== undefined) {
            red_club = red_club.slice(0, red_club.length-1);
        } else {
            red_club = " - "
        }

        // blue
        blue_name = row[5].split(/\(/)[0].trim();
        arr_blue_name = blue_name.split(' ');
        blue_lastname = arr_blue_name.pop();
        blue_firstname = arr_blue_name.join(' ');
        
        blue_club = row[5].split(/\(/)[1];
        if (blue_club !== undefined) {
            blue_club = blue_club.trim().slice(0, blue_club.length-1);
        } else {
            blue_club = " - "
        }

        newMatch = {
            category: category,
            round: round,
            mat: mat,
            id: id,
            red_name: red_name,
            red_firstname: red_firstname,
            red_lastname: red_lastname,
            red_fullname: red_name.replace(' ', '').toLowerCase(),
            red_club: red_club,
            blue_name: blue_name,
            blue_firstname: blue_firstname,
            blue_lastname: blue_lastname,
            blue_fullname: blue_name.replace(' ', '').toLowerCase(),
            blue_club: blue_club
        };

        matches.push(newMatch);
    }

    var sqlQuery = "";

    for (i=0; i<matches.length;i++){
        sqlQuery = sqlQuery+`
        (
            "${matches[i].category}",
            "${matches[i].round}",
            "${matches[i].mat}",
            ${matches[i].id},
            "${matches[i].red_name}",
            "${matches[i].red_firstname}",
            "${matches[i].red_lastname}",
            "${matches[i].red_fullname}",
            "${matches[i].red_club}",
            "${matches[i].blue_name}",
            "${matches[i].blue_firstname}",
            "${matches[i].blue_lastname}",
            "${matches[i].blue_fullname}",
            "${matches[i].blue_club}"
        ),`
    }

    // chop off the last comma
    sqlQuery = sqlQuery.slice(0,sqlQuery.length-1);

    console.log(sqlQuery);
    
    return sqlQuery;
}