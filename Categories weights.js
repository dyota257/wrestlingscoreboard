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
        Male: 	[48, 55, 62, 69, 74, 86, 92,110]
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

var ageDiv = "";
var arWeight = [];
var genderDiv="";
var styleDiv = "";

document.querySelector("select[name=weight]").style.visibility = "hidden";
document.querySelector("select[name=gender]").style.visibility = "hidden";
document.querySelector("select[name=style]").style.visibility = "hidden";

document.querySelector("select[name=age]").addEventListener("change", ()=>{
    document.querySelector("select[name=weight]").style.visibility = "hidden";
    document.querySelector("select[name=gender]").style.visibility = "hidden";
    document.querySelector("select[name=style]").style.visibility = "hidden";
    arWeight=[];
    ageDiv = document.querySelector("select[name=age]").value;
    switch (ageDiv) {
        case "6-7 yrs":
            arWeight = categories[ageDiv];
            break;
        case "8-9 yrs":
            arWeight = categories[ageDiv];
            break;
        case "10-11 yrs":
            arWeight = categories[ageDiv];
            break;
        case "12-13 yrs":
            document.querySelector("select[name=gender]").style.visibility = "visible";
            switch (genderDiv){
                case "Female":
                    arWeight = categories[ageDiv][genderDiv];
                    break;
                case "Male":
                    arWeight = categories[ageDiv][genderDiv];
                    break;
            }        
            break;
        case "14-15 yrs":
    
            break;
        case "16-17 yrs":
    
            break;
        case "18-20 yrs":
    
            break;
        case "21yrs+":
    
            break;
    }   
    
    optionsWeight(arWeight);
    
    console.log("arWeight: "+arWeight);
})

document.querySelector("[name=gender]").addEventListener("change", ()=>{
    document.querySelector("select[name=weight]").style.visibility = "hidden";
    document.querySelector("select[name=gender]").style.visibility = "hidden";
    document.querySelector("select[name=style]").style.visibility = "hidden";
    arWeight=[];
    genderDiv = document.querySelector("select[name=gender]").value;

    switch (genderDiv){
        case "Female":
            arWeight = categories[ageDiv][genderDiv];
            break;
        case "Male":
            arWeight = categories[ageDiv][genderDiv];
            break;
    }        
    
    console.log("arWeight: "+arWeight);
})


function optionsWeight (arWeight) {
    if (arWeight.length>0) {
        document.querySelector("select[name=weight]").style.visibility = "visible";
    }
    document.querySelector("select[name=weight]").innerHTML = "<option value=\"\"></option>";
    for (var i=0; i<arWeight.length; i++) {
        var optionWeight = arWeight[i];
        console.log(optionWeight);
        document.querySelector("select[name=weight]").innerHTML = document.querySelector("select[name=weight]").innerHTML+"<option value=\""+optionWeight+"kg\">"+optionWeight+" kg</option>";
    }
}


// for (var i=0; i<arWeight)