module.exports =tournamentsToOptionsTitles;

function tournamentsToOptionsTitles(x) {
    
    // check that all values in x are unique
    let titles = [];
    for(i=0; i<x.length;i++) {
        if(titles.indexOf(x[i].title)===-1) {
            titles.push(x[i].title)
        } else {
            continue;
        }
     
    }

    // set up empty optinn
    var options='<option value="" selected></option>';

    // set up the rest of the options list
    for(i=0; i<titles.length;i++) {
        
        options = options+
        `<option value="${titles[i]}">${titles[i]}</option>`
    }
    options = options+
    `<option value="Other">Other</option>`
    return options
}

