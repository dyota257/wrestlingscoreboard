var matchOrder = 0;
// Default names in set game form is the first row of the fixtures table
// updateNames() defined in import.js
updateNames(0);

$(`tr[matchOrder='0']`).addClass("matchOrder");

function next() {
    let table = $('[matchOrder]')
    if (matchOrder+1 < table.length) {
        matchOrder++;
        moveMatchOrder();
    };   
}

function prev() {
    if (matchOrder!=0) {
        matchOrder--;
        moveMatchOrder();    
    }
}

function moveMatchOrder() {
    $("tr").removeClass("matchOrder");
    updateNames(matchOrder);
    $(`tr[matchorder='${matchOrder}']`).addClass("matchOrder");
}

function updateNames(matchOrder) {
    // Fixtures table
    [
        {target: '.firstName.red',  dataLabel: 'red_firstname'},
        {target: '.lastName.red',   dataLabel: 'red_lastname'},
        {target: '.clubName.red',   dataLabel: 'red_club'},
        {target: '.firstName.blue', dataLabel: 'blue_firstname'},
        {target: '.lastName.blue',  dataLabel: 'blue_lastname'},
        {target: '.clubName.blue',  dataLabel: 'blue_club'}
    ].forEach((e)=>{    
        $(e.target).text(
            getThisRowFixtures(e.dataLabel)
        );
    })

    // Game setup form
    displayFlex("#playerInput");
    
    [
        {target: 'input#redFirstName',  dataLabel: 'red_firstname'},
        {target: 'input#redLastName',   dataLabel: 'red_lastname'},
        {target: 'input#redClubName',   dataLabel: 'red_club'},
        {target: 'input#blueFirstName', dataLabel: 'blue_firstname'},
        {target: 'input#blueLastName',  dataLabel: 'blue_lastname'},
        {target: 'input#blueClubName',  dataLabel: 'blue_club'}
    ].forEach((e)=>{
        // Get this row from the fixtures tables and put it into the input textboxes
        $(e.target).val(
            getThisRowFixtures(e.dataLabel)
        );
    })
}

function getThisRowFixtures(dataLabel) {
    $(`tr[matchOrder='${matchOrder}']>[data-label='${dataLabel}']`)[0].textContent.trim()
}