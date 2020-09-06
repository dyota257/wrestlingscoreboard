
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

$("button#importDone").click( function() {
    
    // clear previous table!
    table = [];

    $("#fixturesTable").css("display", "flex");

    tablePage.html("");

    raw  =  $("textarea").val();
    // to catch double spaces (otherwise club names are missed)
    rawSingleSpace = raw.replace(/  /g, " "); 
    rows = rawSingleSpace.trim().split("\n");

    for (var i=0; i<rows.length; i++) {

        var names  = [
            rows[i].split("\t")[0], //red side
            rows[i].split("\t")[1] //blue side
        ]
        
        table[i] = names;
        console.log(i);
        console.log(names);
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

    table.pop(); // to remove duplicate last row
    matchOrder = 0;
    updateNames(matchOrder);
    $("textarea").val("");
    $("tr[matchOrder='0']").addClass("matchOrder");

    // HTML controls

    $("#importArea").css("display", "none");
    
    // prepop names from first match
    updateNames(0);

})

$("button#importCancel").click( function() {
    $("#importArea").css("display", "none");
})


$("button#next").click( function() {
    if (matchOrder+1 < table.length) {
        $("tr").removeClass("matchOrder");
        matchOrder++;
        updateNames(matchOrder);
        $("tr[matchorder='"+matchOrder+"']").addClass("matchOrder");
    };
    
})

$("button#prev").click( function() {
    if (matchOrder!=0) {
        $("tr").removeClass("matchOrder");
        matchOrder--;
        updateNames(matchOrder);
        $("tr[matchorder='"+matchOrder+"']").addClass("matchOrder");
    }
})

function updateNames(matchOrder) {

    pairing = table[matchOrder];
    // Fixtures table
    $(".firstName.red").text(pairing[0].split(" ")[0]);
    $(".lastName.red").text(pairing[0].split(" ")[1]);
    $(".clubName.red").text(pairing[0].split(" ")[2]);
    $(".firstName.blue").text(pairing[1].split(" ")[0]);
    $(".lastName.blue").text(pairing[1].split(" ")[1]);
    $(".clubName.blue").text(pairing[1].split(" ")[2]);

    // Game setup form
    $("#playerInput").css("display", "flex");
    
    $("input#redFirstName").val(pairing[0].split(" ")[0]);
    $("input#redLastName").val(pairing[0].split(" ")[1]);
    $("input#redClubName").val(pairing[0].split(" ")[2]);
    $("input#blueFirstName").val(pairing[1].split(" ")[0]);
    $("input#blueLastName").val(pairing[1].split(" ")[1]);
    $("input#blueClubName").val(pairing[1].split(" ")[2]);
}