var wrestlers = [];

document.querySelector('button').addEventListener('click', () => {
    var wrestlers = [];
    var x = document.querySelector('textarea').value;
    var arr = x.split('\n')
    arr.splice(0,1)

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
        var namesArrClean = [];
        
        // for (i=0; i<namesArr.length;i++) {
        //     if(namesArr[i].search(/\(/) === -1){
        //         namesArrClean.push(namesArr[i]);
        //     }
        // }

        last_name = namesArr.pop();
        first_name = namesArr.toString().replace(',', ' ');

        newWrestler = {
            first_name: first_name,
            last_name: last_name,
            gender: row[2].slice(0,1),
            club_name: row[4]
        }
        
        wrestlers.push(newWrestler);
        
    }

    for (i=0; i<wrestlers.length;i++){
        document.querySelector('table').innerHTML = document.querySelector('table').innerHTML+`<tr>
            <td>
                ${i}
            </td>
            <td>
                ${wrestlers[i].first_name}
            </td>
            <td>
                ${wrestlers[i].last_name}
            </td>
            <td>
                ${wrestlers[i].club_name}
            </td>
            <td>
                ${wrestlers[i].gender}
            </td>
        </tr>`

    }

    for (i=0; i<wrestlers.length;i++){
        document.querySelector('span').innerHTML = document.querySelector('span').innerHTML+`
        (
            "${wrestlers[i].first_name}",
            "${wrestlers[i].last_name}",
            "${wrestlers[i].club_name}",
            "${wrestlers[i].gender}"
        ),<br>`
    }
    // return console.log(wrestlers);
})

