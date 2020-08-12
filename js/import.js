
var matchOrder = 0;
var pairing = [];
var table = [];
var blueFirstName = "";
var blueLastName = "";
var blueClubName = "";
var redFirstName = "";
var redLastName = "";
var redClubName = "";
var raw = "";
var rows = [];
var tablePage = $("table[name=list]");

$("button#import").click( function() {
    
    tablePage.html("");

    raw  =  $("textarea").val();

    rows = raw.trim().split("\n");

    for (var i=0; i<rows.length; i++) {
        var names  = [
            rows[i].split("\t")[0], //red side
            rows[i].split("\t")[1] //blue side
        ]
        
        table[i] = names;
        console.log(names);
        console.log(names[1]);
        table.push(names);

        redFirstName = names[0].split(" ")[0];
        redLastName = names[0].split(" ")[1];
        redClubName = names[0].split(" ")[2];
        blueFirstName = names[1].split(" ")[0];
        blueLastName = names[1].split(" ")[1];
        blueClubName = names[1].split(" ")[2];

        tablePage.html(
            tablePage.html() + 
            "<tr matchOrder="+i+"><td>"+redFirstName+" "+redLastName+" "+redClubName+"</td><td>"+blueFirstName+" "+blueLastName+" "+blueClubName+"</td></tr>"
        )
        
    }

    matchOrder = 0;
    updateNames(matchOrder);
    $("textarea").val("");
    $("tr[matchOrder='0']").addClass("matchOrder");
    

})



$("button#next").click( function() {
    $("tr").removeClass("matchOrder")
    if (matchOrder!= table.length) {matchOrder++};
    updateNames(matchOrder);
    $("tr[matchorder='"+matchOrder+"']").addClass("matchOrder");
})

$("button#prev").click( function() {
    $("tr").removeClass("matchOrder")
    if (matchOrder!=0) {matchOrder--;}
    updateNames(matchOrder);
    $("tr[matchorder='"+matchOrder+"']").addClass("matchOrder");
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