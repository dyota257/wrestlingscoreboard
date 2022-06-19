const dateFormat = require('../database/dateFormat.js');

/* 
    tournamentsToHtml: string
    x: {
        id: number,
        date: string,
        title: string,
        location: string
    },
    id: number

    id is the table row that will be highlighted
*/

module.exports = function tournamentsToHtml(x, id) {

    var tableRows = '';

    for (i = 0; i < x.length; i++) {

        tableRows = tableRows +
            `
        <tr ${x[i].id == id ? 'class="matchOrder"' : ''}>
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
        
        `;
    }

    tableRows = `<table class='table'>
        <tr style='font-weight:bold; text-align:center;'>
            <td>Date</td>
            <td>Title</td>
            <td>Location</td>
        </tr>
        ${tableRows}</table>`;

    console.log('tournamentToHtml: ' + id);
    console.log(tableRows);
    return tableRows;
};

