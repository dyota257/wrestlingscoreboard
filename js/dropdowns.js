var categories = 
{
    // Age only block
    "6-7 yrs": [19, 23, 27, 35, 42, 53, 66, 73],
    "8-9 yrs": [23, 27, 35, 42, 53, 66, 73 ],
    "10-11 yrs": [23, 27, 35, 42, 53, 66, 73, 85],
    // Age and sex block
    "12-13 yrs": {
        Female: [33, 37, 44, 50, 55, 62, 73, 85],
        Male: [35, 41, 48, 55, 62, 69, 75, 89]
    },
    "14-15 yrs":{
        Female: [35, 40, 45, 50, 55, 60, 65, 70],
        Male: [35, 42, 49, 56, 63, 70, 78, 89]
    },
    "16-17 yrs":{
        Female: [40, 43, 49, 56, 61, 65, 69, 73],
        Male: 	[48, 55, 62, 69, 74, 86, 92, 110]
    },
    // Age, sex, and male style block
    "18-20 yrs":{
        Female: [50, 53, 57, 62, 68, 76, 85],
        Male: {
            Freestyle:  [57, 65, 74, 79, 86, 92, 97, 125],
            "Greco-Roman": [60, 67, 77, 87, 97, 130]
        } 	
    },
    "21yrs+":{
        Female: [50, 53, 57, 62, 68, 76, 85],
        Male: {
            Freestyle:  [57, 65, 74, 79, 86, 92, 97, 125],
            "Greco-Roman": [60, 67, 77, 87, 97, 130]
        } 	
    }
}

// variables setup
var ageDiv = "";
var arWeight = [];
var genderDiv="";
var styleDiv = "";

// set other dropdowns as hidden, showing only name-age
document.querySelector("select[name=gender]").style.visibility = "hidden";
document.querySelector("select[name=style]").style.visibility = "hidden";
document.querySelector("select[name=weight]").style.visibility = "hidden";

// set selected value to first value = ""
document.querySelector("select[name=age]").value = "";
document.querySelector("select[name=gender]").value = "";
document.querySelector("select[name=style]").value = "";
document.querySelector("select[name=weight]").value = "";

// First dropdown block: age
document.querySelector("select[name=age]").addEventListener("change", ()=>{
    document.querySelector("select[name=gender]").style.visibility = "hidden";
    document.querySelector("select[name=style]").style.visibility = "hidden";
    document.querySelector("select[name=weight]").style.visibility = "hidden";
    arWeight=[];
    ageDiv = document.querySelector("select[name=age]").value;
    if (
        ageDiv == "6-7 yrs"
        || ageDiv == "8-9 yrs"
        || ageDiv == "10-11 yrs"
    ) {
        arWeight = categories[ageDiv];
        optionsWeight(arWeight);
    } else if (ageDiv != "") {
        document.querySelector("select[name=gender]").style.visibility = "visible";
    }
})

// Second dropdown block: gender
document.querySelector("[name=gender]").addEventListener("change", ()=>{
    document.querySelector("select[name=weight]").style.visibility = "hidden";
    document.querySelector("select[name=style]").style.visibility = "hidden";
    arWeight=[];
    genderDiv = document.querySelector("select[name=gender]").value;
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
        document.querySelector("select[name=style]").style.visibility = "visible";
    }
})

// Third dropdown block: style
document.querySelector("[name=style]").addEventListener("change", ()=>{
    document.querySelector("select[name=weight]").style.visibility = "hidden";
    arWeight=[];
    styleDiv = document.querySelector("select[name=style]").value;
    arWeight = categories[ageDiv][genderDiv][styleDiv];
    optionsWeight(arWeight);
})



function optionsWeight (arWeight) {

    if (arWeight.length>0) {
        document.querySelector("select[name=weight]").style.visibility = "visible";
    }

    document.querySelector("select[name=weight]").innerHTML = "<option value=\"\"></option>";

    for (var i=0; i<arWeight.length; i++) {
        var optionWeight = arWeight[i];
        document.querySelector("select[name=weight]").innerHTML = document.querySelector("select[name=weight]").innerHTML+"<option value=\""+optionWeight+"kg\">"+optionWeight+" kg</option>";
    }

}