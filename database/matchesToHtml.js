module.exports = matchesToHtml;

function matchesToHtml(x) {
    
    let tableRows='';
    let colorRed = "color:#f99";
    let colorBlue = "color:#99f";

    for(i=0; i<x.length;i++) {
        
        tableRows = tableRows+
        `
        <tr matchOrder="${i}">
            <td>
                ${x[i].category}
            </td>
            <td>
                ${x[i].round}
            </td>
            <td style='${colorRed};'>
                ${x[i].red_name}
            </td>
            <td style='${colorRed};display:none'>
                ${x[i].red_firstname}
            </td>
            <td style='${colorRed};display:none'>
                ${x[i].red_lastname}
            </td>
            <td style='${colorRed};'>
                ${x[i].red_club}
            </td>
            <td style='${colorBlue};'>
                ${x[i].blue_name}
            </td>
            <td style='${colorBlue};display:none'>
                ${x[i].blue_firstname}
            </td>
            <td style='${colorBlue};display:none'>
                ${x[i].blue_lastname}
            </td>
            <td style='${colorBlue};'>
                ${x[i].blue_club}
            </td>
        </tr>
        
        `
    }

    tableRows = `<table name='list'>
        <tr style='font-weight:bold; text-align:center;'>
            <td>Category</td>
            <td>Round</td>
            <td>Red</td>
            <td>Red Club</td>
            <td>Blue</td>
            <td>Blue Club</td>
        </tr>
    ${tableRows}</table>`

    return tableRows
}

