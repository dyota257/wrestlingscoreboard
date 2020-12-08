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

$(`tr[matchOrder='0']`).addClass("matchOrder");

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
    
    // Fixtures table
    $(".firstName.red").text(   $(`tr[matchOrder='${matchOrder}']>[data-label='red_firstname']`)[0].textContent.trim());
    $(".lastName.red").text(    $(`tr[matchOrder='${matchOrder}']>[data-label='red_lastname']`)[0].textContent.trim());
    $(".clubName.red").text(    $(`tr[matchOrder='${matchOrder}']>[data-label='red_club']`)[0].textContent.trim());
    $(".firstName.blue").text(  $(`tr[matchOrder='${matchOrder}']>[data-label='blue_firstname']`)[0].textContent.trim());
    $(".lastName.blue").text(   $(`tr[matchOrder='${matchOrder}']>[data-label='blue_lastname']`)[0].textContent.trim());
    $(".clubName.blue").text(   $(`tr[matchOrder='${matchOrder}']>[data-label='blue_club']`)[0].textContent.trim());

    // Game setup form
    $("#playerInput").css("display", "flex");
    
    $("input#redFirstName").val($(`tr[matchOrder='${matchOrder}']>[data-label='red_firstname']`)[0].textContent.trim());
    $("input#redLastName").val($(`tr[matchOrder='${matchOrder}']>[data-label='red_lastname']`)[0].textContent.trim());
    $("input#redClubName").val($(`tr[matchOrder='${matchOrder}']>[data-label='red_club']`)[0].textContent.trim());
    $("input#blueFirstName").val($(`tr[matchOrder='${matchOrder}']>[data-label='blue_firstname']`)[0].textContent.trim());
    $("input#blueLastName").val($(`tr[matchOrder='${matchOrder}']>[data-label='blue_lastname']`)[0].textContent.trim());
    $("input#blueClubName").val($(`tr[matchOrder='${matchOrder}']>[data-label='blue_club']`)[0].textContent.trim());
}
