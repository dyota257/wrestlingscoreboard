module.exports =tournamentsToHtml;

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

function dateFormat(x) {
    const days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let day = days[x.getDay()];
    let date = x.getDate();
    let month = months[x.getMonth()]
    let year = x.getFullYear();

    return `${day}, ${date} ${month}, ${year}`

}