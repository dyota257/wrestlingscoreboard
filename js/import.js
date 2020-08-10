
var matchOrder = 0;
var pairing = [];
var table = [];
var blueFirstName = "";
var blueLastName = "";
var redFirstName = "";
var redLastName = "";

$("button#import").click( function() {
    var raw  =  $("textarea").val();
    
    var rows = raw.split("\n");

    for (var i=0; i<rows.length; i++) {
        var names  = [
            rows[i].split("\t")[4], //red side
            rows[i].split("\t")[5] //blue side
        ]
        
        table.push(names);

    }

    matchOrder = 0;
    updateNames(matchOrder);

})



$("button#next").click( function() {
    matchOrder++;
    updateNames(matchOrder);
})

$("button#prev").click( function() {
    if (matchOrder!=0) {matchOrder--;}
    updateNames(matchOrder);
})

function updateNames(matchOrder) {
    pairing = table[matchOrder];
    $(".firstName.red").text(pairing[0].split(" ")[0]);
    $(".lastName.red").text(pairing[0].split(" ")[1]);
    $(".clubName.red").text(pairing[0].split(" ")[2]);
    $(".firstName.blue").text(pairing[1].split(" ")[0]);
    $(".lastName.blue").text(pairing[1].split(" ")[1]);
    $(".clubName.blue").text(pairing[1].split(" ")[2]);
}