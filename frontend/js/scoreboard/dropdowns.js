// Defaults

// default mat
const url = window.location.pathname.split('/');
const mat = url[url.length-1];

$(`select[name=mat]>option[value='${mat}']`).attr('selected', true);


const  categories = 
{
    // Age only block
    "6-7 yrs": [19, 23, 27, 35, 42, 53, 66, 73, '73+'],
    "8-9 yrs": [23, 27, 35, 42, 53, 66, 73, '73+'],
    "10-11 yrs": [23, 27, 35, 42, 53, 66, 73, 85, '85+'],
    // Age and sex block
    "12-13 yrs": {
        Female: [33, 37, 44, 50, 55, 62, 73, 85, '85+'],
        Male: [35, 41, 48, 55, 62, 69, 75, 89, '89+']
    },
    "14-15 yrs":{
        Female: [35, 40, 45, 50, 55, 60, 65, 70, '70+'],
        Male: [35, 42, 49, 56, 63, 70, 78, 89, '89+']
    },
    "16-17 yrs":{
        Female: [40, 43, 49, 56, 61, 65, 69, 73, '73+'],
        Male: 	[48, 55, 62, 69, 74, 86, 92, 110, '110+']
    },
    // Age, sex, and male style block
    "18-20 yrs":{
        Female: [50, 53, 57, 62, 68, 76, 85, '85+'],
        Male: {
            Freestyle:  [57, 65, 74, 79, 86, 92, 97, 125, '125+'],
            "Greco-Roman": [60, 67, 77, 87, 97, 130, '130+']
        } 	
    },
    "21yrs+":{
        Female: [50, 53, 57, 62, 68, 76, 85, '85+'],
        Male: {
            Freestyle:  [57, 65, 74, 79, 86, 92, 97, 125, '125+'],
            "Greco-Roman": [60, 67, 77, 87, 97, 130, '130+']
        } 	
    }
}

// variables setup
let ageDiv = "";
let arWeight = [];
let genderDiv="";
let styleDiv = "";

// set other dropdowns as hidden, showing only name-age
$("[name=gender]").css("visibility", "hidden");
$("[name=style]").css("visibility", "hidden");
$("[name=weight]").css("visibility", "hidden");

// set selected value to first value = ""
$("select[name=age]").val("");
$("select[name=gender]").val("");
$("select[name=style]").val("");
$("select[name=weight]").val("");

// First dropdown block: age
$("select[name=age]").change(()=>{
    $("[name=gender]").css("visibility", "hidden");
    $("[name=style]").css("visibility", "hidden");
    $("[name=weight]").css("visibility", "hidden");

    $("select[name=gender]").val("");
    $("select[name=style]").val("");
    $("select[name=weight]").val("");

    arWeight=[];
    ageDiv = $("select[name=age]").val();
    if (
        ageDiv == "6-7 yrs"
        || ageDiv == "8-9 yrs"
        || ageDiv == "10-11 yrs"
    ) {
        arWeight = categories[ageDiv];
        optionsWeight(arWeight);
    } else if (ageDiv.indexOf('min') === -1) {
        $("[name=gender]").css("visibility", "visible");
    }
})

// Second dropdown block: gender
$("select[name=gender]").change(()=>{
    $("[name=weight]").css("visibility", "hidden");
    $("[name=style]").css("visibility", "hidden");

    $("select[name=style]").val("");
    $("select[name=weight]").val("");

    arWeight=[];
    genderDiv = $("select[name=gender]").val();

    if (
        ageDiv == "12-13 yrs"
        || ageDiv == "14-15 yrs"
        || ageDiv == "16-17 yrs"
        || genderDiv == "Female" && (ageDiv == "18-20 yrs" || ageDiv == "21yrs+")
    ) {
        arWeight = categories[ageDiv][genderDiv];
        optionsWeight(arWeight);
    } else if (        
        genderDiv == "Male" && (ageDiv == "18-20 yrs" || ageDiv == "21yrs+")
    ) {
       $("[name=style]").css("visibility", "visible");
    }
})

// Third dropdown block: style
$("select[name=style]").change(()=>{
    $("select[name=weight]").css("visibility", "hidden");
    $("select[name=weight]").val("");
    arWeight=[];
    styleDiv = $("select[name=style]").val();
    arWeight = categories[ageDiv][genderDiv][styleDiv];
    optionsWeight(arWeight);
})

function optionsWeight (arWeight) {

    if (arWeight.length>0) {
        $("[name=weight]").css("visibility", "visible");
    }

    $("select[name=weight]").html("<option value=\"\"></option>");

    for (var i=0; i<arWeight.length; i++) {
        var optionWeight = arWeight[i];
        $("select[name=weight]").html(
            $("select[name=weight]").html()+"<option value=\""+optionWeight+"kg\">"+optionWeight+" kg</option>"
        );
    }

}

function dropdownsCheckWhich() {
    const ageDiv = $("select[name=age]").val();
    const styleDiv = $("select[name=style]").val();
    var gameType = "";
    if (styleDiv == "Greco-Roman") {
        gameType = "Senior Greco-Roman";
    } else if (ageDiv == "18-20 yrs" || ageDiv == "21yrs+") {
        gameType = "Senior Freestyle";
    }  else  if (ageDiv.indexOf('min') === -1) { // not an exhibition
        gameType = "Junior Freestyle";
    } else if (ageDiv === '2min') {
        gameType = 'Exhibition: 2 mins'
    } else {
        gameType = 'Exhibition: 3 mins'
    }

    const styleAndAge = [gameType, ageDiv];
    return styleAndAge
}

// Age 	Gender 	Freestyle Weight Categories (kg) 	Greco Roman Weight Categories (kg)
// 6-7 yrs 	Male/Female 	19, 23, 27, 35, 42, 53, 66, 73 and 73+ 	 
// 8-9 yrs 	Male/Female 	23, 27, 35, 42, 53, 66, 73 and 73+ 	 
// 10-11 yrs 	Male/Female 	23, 27, 35, 42, 53, 66, 73, 85 and 85+ 	 
// 12-13 yrs 	Female 	33, 37, 44, 50, 55, 62, 73, 85 and 85+ 	 
// 12-13 yrs 	Male 	35, 41, 48, 55, 62, 69, 75, 89 and 89+ 	 
// 14-15 yrs 	Female 	35, 40, 45, 50, 55, 60, 65, 70 and 70+ 	 
// 14-15 yrs 	Male 	35, 42, 49, 56, 63, 70, 78, 89 and 89+ 	 

// 16- 17 yrs

// (Cadets)
// 	Female 	40, 43, 49, 56, 61, 65, 69, 73 and 73+ 	 

// 16- 17 yrs

// (Cadets)
// 	Male 	48, 55, 62, 69, 74, 86, 92, 110 and 110+ 	 

// 18-20 yrs

// (Juniors)
// 	Female 	50, 53, 57, 62, 68, 76, 85 and 85+ 	 

// 18-20 yrs

// (Juniors)
// 	Male 	57, 65, 74, 79, 86, 92, 97, 125 and 125+ 	60, 67, 77, 87, 97, 130 and 130+

// 21yrs +

// (Seniors)
// 	Female 	50, 53, 57, 62, 68, 76, 85 and 85+ 	 

// 21yrs +

// (Seniors)
// 	Male 	57, 65, 74, 79, 86, 92, 97, 125 and 125+ 	60, 67, 77, 87, 97, 130 and 130+