module.exports = matchesToHtml;

function matchesToHtml(x) {
    
    let tableRows='';
    let colorRed = "color:#f00";
    let colorBlue = "color:#00f";

    for(i=0; i<x.length;i++) {
        
        tableRows = tableRows+
        `
        <tr matchOrder="${i}">
            <td data-label="id" style="display:none" >
                ${x[i].id}
            </td>
            <td data-label="mat" style="display:none" >
                ${x[i].mat}
            </td>
            
            <td class="mobile" data-label="category">
                ${x[i].category}
            </td>
            <td class="mobile" data-label="round">
                ${x[i].round}
            </td>
            <td data-label="red_name" style='${colorRed};'>
                ${x[i].red_name}
            </td>
            <td data-label="red_firstname" style='${colorRed};display:none'>
                ${x[i].red_firstname}
            </td>
            <td data-label="red_lastname" style='${colorRed};display:none'>
                ${x[i].red_lastname}
            </td>
            <td class="mobile" data-label="red_club" style='${colorRed};'>
                ${x[i].red_club}
            </td>
            <td data-label="blue_name" style='${colorBlue};'>
                ${x[i].blue_name}
            </td>
            <td data-label="blue_firstname" style='${colorBlue};display:none'>
                ${x[i].blue_firstname}
            </td>
            <td data-label="blue_lastname" style='${colorBlue};display:none'>
                ${x[i].blue_lastname}
            </td>
            <td class="mobile" data-label="blue_club" style='${colorBlue};'>
                ${x[i].blue_club.slice(0,-1)}
            </td>
        </tr>
        
        `
    }

    tableRows = `<table class="table" name='list'>
        <tr class="header mobile" style='font-weight:bold; text-align:center;'>
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

