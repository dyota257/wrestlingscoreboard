module.exports =tournamentsToOptionsLocations;

function tournamentsToOptionsLocations(x) {

    // check that all values in x are unique
    let locations = [];
    for(i=0; i<x.length;i++) {
        if(locations.indexOf(x[i].location)===-1) {
            locations.push(x[i].location)
        } else {
            continue;
        }
        
    }

    var options='<option value="" selected></option>';

    for(i=0; i<locations.length;i++) {
        
        options = options+
        `<option value="${locations[i]}">${locations[i]}</option>`
    }
    options = options+
    `<option value="Other">Other</option>`
    return options
}

