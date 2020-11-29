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
    table = $('[matchOrder]')

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
    $(".firstName.red").text(pairing.children[5].textContent.trim());
    $(".lastName.red").text(pairing.children[6].textContent.trim());
    $(".clubName.red").text(pairing.children[7].textContent.trim());
    $(".firstName.blue").text(pairing.children[9].textContent.trim());
    $(".lastName.blue").text(pairing.children[10].textContent.trim());
    $(".clubName.blue").text(pairing.children[11].textContent.trim());

    // Game setup form
    $("#playerInput").css("display", "flex");
    
    $("input#redFirstName").val(pairing.children[5].textContent.trim());
    $("input#redLastName").val(pairing.children[6].textContent.trim());
    $("input#redClubName").val(pairing.children[7].textContent.trim());
    $("input#blueFirstName").val(pairing.children[9].textContent.trim());
    $("input#blueLastName").val(pairing.children[10].textContent.trim());
    $("input#blueClubName").val(pairing.children[11].textContent.trim());
}