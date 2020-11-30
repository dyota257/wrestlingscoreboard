module.exports = matchesToHtml;

function matchesToHtml(x) {
    
    let tableRows='';
    let colorRed = "color:#f99";
    let colorBlue = "color:#99f";

    for(i=0; i<x.length;i++) {
        
        tableRows = tableRows+
        `
        <tr class="mobile" matchOrder="${i}">
            <td class="mobile" data-label="category">
                ${x[i].category}
            </td>
            <td class="mobile" data-label="round">
                ${x[i].round}
            </td>
            <td class="mobile" data-label="red_name" style='${colorRed};'>
                ${x[i].red_name}
            </td>
            <td class="mobile" data-label="red_firstname" style='${colorRed};display:none'>
                ${x[i].red_firstname}
            </td>
            <td class="mobile" data-label="red_lastname" style='${colorRed};display:none'>
                ${x[i].red_lastname}
            </td>
            <td class="mobile" data-label="red_club" style='${colorRed};'>
                ${x[i].red_club}
            </td>
            <td class="mobile" data-label="blue_name" style='${colorBlue};'>
                ${x[i].blue_name}
            </td>
            <td class="mobile" data-label="blue_firstname" style='${colorBlue};display:none'>
                ${x[i].blue_firstname}
            </td>
            <td class="mobile" data-label="blue_lastname" style='${colorBlue};display:none'>
                ${x[i].blue_lastname}
            </td>
            <td class="mobile" data-label="blue_club" style='${colorBlue};'>
                ${x[i].blue_club}
            </td>
        </tr>
        
        `
    }

    tableRows = `<table class="mobile" name='list'>
        <tr class="mobile"style='font-weight:bold; text-align:center;'>
            <td class="mobile">Category</td>
            <td class="mobile">Round</td>
            <td class="mobile">Red</td>
            <td class="mobile">Red Club</td>
            <td class="mobile">Blue</td>
            <td class="mobile">Blue Club</td>
        </tr>
    ${tableRows}</table>`

    return tableRows
}

