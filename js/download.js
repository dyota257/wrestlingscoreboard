
$("#download").click( function() {
    console.log("Click download.");
    exportTableToCSV("numbers.csv");
});

function exportTableToCSV(filename) {
    console.log("Start exportTableToCSV");
    var csv = [];
    var rows = $("table.results tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
    console.log("End exportTableToCSV");
};