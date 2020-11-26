module.exports =tournamentsToHtml;

const dateFormat = require('../database/dateFormat.js');

function tournamentsToHtml(x) {
    
    var tableRows='';

    for(i=0; i<x.length;i++) {
        
        tableRows = tableRows+
        `
        <tr>
            <td>
                ${dateFormat(x[i].date)}
            </td>
            <td>
                <a href="/tournaments/open?id=${x[i].id}">${x[i].title}</a>
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

