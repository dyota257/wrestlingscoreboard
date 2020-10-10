module.exports =tournamentsToHtml;

function tournamentsToHtml(x) {
    
    var tableRows='';

    for(i=0; i<x.length;i++) {
        
        tableRows = tableRows+
        `
        <tr>
            <td>
                ${x[i].date}
            </td>
            <td>
                ${x[i].title}
            </td>
            <td>
                ${x[i].location}
            </td>
        </tr>
        
        `
    }

    tableRows = `<table>
        <tr style='font-weight:bold; text-align:center;'>
            <td>Date</td>
            <td>Title</td>
            <td>Location</td>
        </tr>
    ${tableRows}</table>`

    return tableRows
}

