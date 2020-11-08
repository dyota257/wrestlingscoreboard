module.exports =tournamentsToOptions;

function tournamentsToOptions(x) {
    
    var options='<option value="" selected></option>';

    for(i=0; i<x.length;i++) {
        
        options = options+
        `<option value="${x[i].title}">${x[i].title}</option>`
    }
    options = options+
    `<option value="Other">Other</option>`
    return options
}

