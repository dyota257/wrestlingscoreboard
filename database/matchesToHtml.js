module.exports = function matchesToHtml(inputJson) {

    let tableRows = '';
    let colorRed = "color:#f00";
    let colorBlue = "color:#00f";

    inputJson.forEach((e, i) => {
        tableRows = tableRows +
            `
        <tr matchOrder="${i}">
            <td data-label="id" style="display:none" > ${e.id} </td>
            <td data-label="mat" style="display:none" > ${e.mat} </td>
            
            <td class="mobile" data-label="category"> ${e.category} </td>
            <td class="mobile" data-label="round"> ${e.round} </td>
            
            <td data-label="red_name" style='${colorRed};'> ${e.red_name} </td>
            <td data-label="red_firstname" style='${colorRed};display:none'> ${e.red_firstname} </td>
            <td data-label="red_lastname" style='${colorRed};display:none'> ${e.red_lastname} </td>
            
            <td class="mobile" data-label="red_club" style='${colorRed};'> ${e.red_club} </td>
            
            <td data-label="blue_name" style='${colorBlue};'> ${e.blue_name} </td>
            <td data-label="blue_firstname" style='${colorBlue};display:none'> ${e.blue_firstname} </td>
            <td data-label="blue_lastname" style='${colorBlue};display:none'> ${e.blue_lastname} </td>

            <td class="mobile" data-label="blue_club" style='${colorBlue};'> ${e.blue_club.slice(0, -1)} </td>
        </tr>
        
        `;
    });

    tableRows = `<table class="table" name='list'>
        <tr class="header mobile" style='font-weight:bold; text-align:center;'>
            <td>Category</td>
            <td>Round</td>
            <td>Red</td>
            <td>Red Club</td>
            <td>Blue</td>
            <td>Blue Club</td>
        </tr>
    ${tableRows}</table>`;

    return tableRows;
};

