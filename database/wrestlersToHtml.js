module.exports =wrestlersToHtml;

function wrestlersToHtml(x) {
    
    var tableRows='';

    for(i=0; i<x.length;i++) {
        
        tableRows = tableRows+
        `
        <tr>
            <td>
                ${x[i].first_name}
            </td>
            <td>
                ${x[i].last_name}
            </td>
            <td>
                ${x[i].club_name}
            </td>
            <td>
                ${x[i].gender}
            </td>
        </tr>
        
        `
    }

    tableRows = `<table>
        <tr style='font-weight:bold; text-align:center;'>
            <td>First name</td>
            <td>Last name</td>
            <td>Club</td>
            <td>Gender</td>
        </tr>
    ${tableRows}</table>`

    return tableRows
}

