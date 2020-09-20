function victory(side, method) {
    $(".popup").css("display", "flex");
    $(".popup").css("height", document.body.clientHeight);
    
    // pause time
    startTimer(now);
    
    // declare winner
    var winnerName = "";
    var popupText = "";
    var popupBg = "";
    if (side == "draw") {
        popupText = "Draw!";
        popupBg = "black";
    } else {
        side == "blue" ? winnerName = blueFirstName+" "+blueLastName : winnerName = redFirstName+" "+redLastName;
        popupText = winnerName +" wins by "+ method +"!";
        popupBg = side;
    }
    $(".popup-text").text(popupText);
    $(".popup-content").css("background", popupBg);
    
    // add the rows of table here. 

    var matchResults = $("table.results>tbody")
    console.log(matchResults)
    var newRow = 
        "<td>"+blueFirstName+" "+blueLastName+"</td>"
        +"<td>"+redFirstName+" "+redLastName+"</td>"
        +"<td>"+scoreBlue+"</td>"
        +"<td>"+scoreRed+"</td>"
        +"<td>"+winnerName+"</td>"
        +"<td>"+method+"</td>";

    matchResults.html(matchResults.html() + newRow);
    
};
