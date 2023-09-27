const options = {
    method : "GET",
    mode: 'cors',
    headers: {
        Authorization: "METToken 63d724fba9f9323723b5ae28166a1f2db586747c",
        //SAMPLE TOKEN FOR MET API (Recommended to put in .env)
        //METToken 84e08247cef2678af77f5f10c4fca798fc1a1a7a
        //METToken 63d724fba9f9323723b5ae28166a1f2db586747c
    }
};

function showForecast(name) {
    const infoBox = $('#infoBox'); 
    const statename = $('#statename');

    infoBox.css({visibility: "visible", opacity: "1"});

    statename.text(name);

    const locationMap = {
        "Johor": "1",
        "Kedah": "2",
        "Kelantan": "3",
        "Labuan": "5",
        "Melaka": "6",
        "Negeri Sembilan": "7",
        "Pahang": "8",
        "Pulau Pinang": "9",
        "Perak": "10",
        "Perlis": "11",
        "Sabah": "13",
        "Sarawak": "14",
        "Selangor": "15",
        "Terengganu": "16"
    };

    var dateTime = new Date();

    var year = dateTime.getFullYear();
    var month = dateTime.getMonth()+1;
    var day = dateTime.getDate();

    if (month < 10){
        month = "0"+month;
    }

    if (day < 10){
        day = "0"+day;
    }

    var today = year+'-'+month+'-'+day;

    var theUrl ="https://api.met.gov.my/v2/data?datasetid=FORECAST&datacategoryid=GENERAL&locationid=LOCATION:"+locationMap[name]+"&start_date="+today+"&end_date="+today;

    httpGetAsync(theUrl);
    //Example: "https://api.met.gov.my/v2/data?datasetid=FORECAST&datacategoryid=GENERAL&locationid=LOCATION:237&start_date=2022-04-28&end_date=2022-04-28"
}
  
function hideForecast() {
    const infoBox = $('#infoBox');

    infoBox.css({visibility: "hidden", opacity: "0"})
}

function httpGetAsync(theUrl){

    //MET API SAMPLE LINK: var theUrl = "https://api.met.gov.my/v2.1/locations?locationcategoryid=TOWN&offset=0";

    $.ajax({
        url: theUrl,
        type: options.method,
        headers: options.headers,
        success: function (data) {
            updateInfo(data);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

function updateInfo(data){
    const FGM = $('#FGM');
    const FGA = $('#FGA');
    const FGN = $('#FGN');
    const FMAXT = $('#fmaxt');
    const FMINT = $('#fmint');
    const FSIGW = $('#fsigw');
    const SIGW = $('#fsigwTime');

    for (var i=0; i<data.results.length; i++) {
        for (var key in data.results[i]) {
            if (data.results[i].datatype == "FGM") {
                FGM.text(data.results[i].value);
            } else if (data.results[i].datatype == "FGA") {
                FGA.text(data.results[i].value);
            } else if (data.results[i].datatype == "FGN") {
                FGN.text(data.results[i].value);
            } else if (data.results[i].datatype == "FMAXT") {
                FMAXT.text(data.results[i].value);
            } else if (data.results[i].datatype == "FMINT") {
                FMINT.text(data.results[i].value);
            } else if (data.results[i].datatype == "FSIGW") {
                FSIGW.text(data.results[i].value);
                SIGW.text(data.results[i].attributes.when);
            }
        }
     }
}

function displayTime(){
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    var date = dateTime.getFullYear()+' / '+(dateTime.getMonth()+1)+' / '+dateTime.getDate()+"     -     ";
    var date2 = dateTime.getFullYear()+' / '+(dateTime.getMonth()+1)+' / '+dateTime.getDate();
    var session = $('#session');

    if(hrs >= 12){
        session.innerHTML = 'PM';
    }else{
        session.innerHTML = 'AM';
    }

    if(hrs > 12){
        hrs = hrs - 12;
    }
    
    if (hrs < 10){
        hrs = "0"+hrs;
    }

    if (min < 10){
        min = "0"+min;
    }

    if (sec < 10){
        sec = "0"+sec;
    }

    $('#hours').text(hrs);
    $('#minutes').text(min);
    $('#seconds').text(sec);
    $('#day').text(date);
    $('#gifTime').text(date2);
}

function openTab(evt, functionName) {
    
    var dateTime = new Date();
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth()+1;
    var month2 = dateTime.getMonth()+1;
    var month3 = dateTime.getMonth()+1;
    var day1 = dateTime.getDate();
    var day2 = dateTime.getDate()+1;
    var day3 = dateTime.getDate()+2;

    
    if (month == 1 || month == 3 ||month == 5 || month == 7 || month == 8 || month == 10|| month == 12){
        if (day1 == 29){
            day3 = 1;
            month3 = month3 + 1;
        } else if (day1 == 30){
            day2 = 31;
            day3 = 1;
            month3 = month3 + 1;
        }
    }

    if (month == 2 || month == 4 ||month == 6 || month == 9 || month == 11){
        if (day1 == 29){
            day3 = 1;
            month3 = month3 + 1;
        } else if (day1 == 30){
            day2 = 1;
            day3 = 2;
            month2 = month2 + 1;
            month3 = month3 + 1;
        }
    }

    if (month < 10){month = "0"+month;}
    if (month2 < 10){month2 = "0"+month2;}
    if (month3 < 10){month3 = "0"+month3;}
    if (day1 < 10){day1 = "0"+day1;}
    if (day2 < 10){day2 = "0"+day2;}
    if (day3 < 10){day3 = "0"+day3;}
    
    var day1st = year+'-'+month+'-'+day1;
    var day2nd = year+'-'+month2+'-'+day2;
    var day3rd = year+'-'+month3+'-'+day3;

    const today = $('#day1')
    const tomorrow = $('#day2')
    const tomorrow2 = $('#day3')

    today.text(day1st);
    tomorrow.text(day2nd);
    tomorrow2.text(day3rd);

    $(".tabcontent").css("display", "none");
    $(".tablinks").removeClass("active");
    $("#" + functionName).css("display", "block");
    $(evt.currentTarget).addClass("active");
}

function searchLocation(){

    var status = false;

    var count = 0;
    for (var i = 0; i < 151; i=i+50){

        var townUrl = "https://api.met.gov.my/v2.1/locations?locationcategoryid=TOWN&offset=" + i;

        fetch(townUrl, options)
        .then(( res ) => {
            return res.json();
        })
        .then( (data) => {
            //console.log(data);
            locationID = find(data);
            if (i == 150){
                if (!locationID.ok) {
                    alert("No location found.");
                    throw new Error("No location found.");
                }
            }
            return locationID;
        })
        .then( (locationID) => {
            //console.log(locationID);
            if (locationID !== undefined){
                status = "true";
                httpGetAsyncForLocation(locationID);
            } else {
                count+=50;
                if (count == 200) {
                    alert("No location found.");
                    throw new Error("No location found.");
                }
            }
        });

        if (status == "true"){
            break;
        }
        
    }
}

function find(data){

    var locationID;
    var theLocation = $(".search-bar").val();

    $.each(data.results, function(i, item) {
        if (item.name == theLocation.toUpperCase()) {

            locationID = item.id;
            const locationName = $('#foundLocation');
            
            locationName.text(item.name);

            return false;
        }
    });

    return locationID;
}

function updateLocationInfo(data){

    var dateTime = new Date();
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth()+1;
    var month2 = dateTime.getMonth()+1;
    var month3 = dateTime.getMonth()+1;
    var day1 = dateTime.getDate();
    var day2 = dateTime.getDate()+1;
    var day3 = dateTime.getDate()+2;
    
    if (month == 1 || month == 3 ||month == 5 || month == 7 || month == 8 || month == 10|| month == 12){
        if (day1 == 29){
            day3 = 1;
            month3 = month3 + 1;
        } else if (day1 == 30){
            day2 = 31;
            day3 = 1;
            month3 = month3 + 1;
        }
    }

    if (month == 2 || month == 4 ||month == 6 || month == 9 || month == 11){
        if (day1 == 29){
            day3 = 1;
            month3 = month3 + 1;
        } else if (day1 == 30){
            day2 = 1;
            day3 = 2;
            month2 = month2 + 1;
            month3 = month3 + 1;
        }
    }

    if (month < 10){month = "0"+month;}
    if (month2 < 10){month2 = "0"+month2;}
    if (month3 < 10){month3 = "0"+month3;}
    if (day1 < 10){day1 = "0"+day1;}
    if (day2 < 10){day2 = "0"+day2;}
    if (day3 < 10){day3 = "0"+day3;}
    
    var day1st = year+'-'+month+'-'+day1;
    var day2nd = year+'-'+month2+'-'+day2;
    var day3rd = year+'-'+month3+'-'+day3;

    //FIRST DAY
    const FGM1 = $('#locationFGM1');
    const FGA1 = $('#locationFGA1');
    const FGN1 = $('#locationFGN1');
    const FMAXT1 = $('#locationfmaxt1');
    const FMINT1 = $('#locationfmint1');
    const FSIGW1 = $('#locationfsigw1');
    const SIGW1 = $('#locationfsigwTime1');

    //SECOND DAY
    const FGM2 = $('#locationFGM2');
    const FGA2 = $('#locationFGA2');
    const FGN2 = $('#locationFGN2');
    const FMAXT2 = $('#locationfmaxt2');
    const FMINT2 = $('#locationfmint2');
    const FSIGW2 = $('#locationfsigw2');
    const SIGW2 = $('#locationfsigwTime2');

    //THIRD DAY
    const FGM3 = $('#locationFGM3');
    const FGA3 = $('#locationFGA3');
    const FGN3 = $('#locationFGN3');
    const FMAXT3 = $('#locationfmaxt3');
    const FMINT3 = $('#locationfmint3');
    const FSIGW3 = $('#locationfsigw3');
    const SIGW3 = $('#locationfsigwTime3');

    for (var i=0; i<data.results.length; i++) {
        for (var key in data.results[i]) {

            dataDate = data.results[i].date.slice(0,10);
            if (dataDate == day1st){
                if (data.results[i].datatype == "FGM") {
                    FGM1.text(data.results[i].value);
                } else if (data.results[i].datatype == "FGA") {
                    FGA1.text(data.results[i].value);
                } else if (data.results[i].datatype == "FGN") {
                    FGN1.text(data.results[i].value);
                } else if (data.results[i].datatype == "FMAXT") {
                    FMAXT1.text(data.results[i].value);
                } else if (data.results[i].datatype == "FMINT") {
                    FMINT1.text(data.results[i].value);
                } else if (data.results[i].datatype == "FSIGW") {
                    FSIGW1.text(data.results[i].value);
                    SIGW1.text(data.results[i].attributes.when);
                }
            } else if (dataDate == day2nd){
                if (data.results[i].datatype == "FGM") {
                    FGM2.text(data.results[i].value);
                } else if (data.results[i].datatype == "FGA") {
                    FGA2.text(data.results[i].value);
                } else if (data.results[i].datatype == "FGN") {
                    FGN2.text(data.results[i].value);
                } else if (data.results[i].datatype == "FMAXT") {
                    FMAXT2.text(data.results[i].value);
                } else if (data.results[i].datatype == "FMINT") {
                    FMINT2.text(data.results[i].value);
                } else if (data.results[i].datatype == "FSIGW") {
                    FSIGW2.text(data.results[i].value);
                    SIGW2.text(data.results[i].attributes.when);
                }
            } else if (dataDate == day3rd){
                if (data.results[i].datatype == "FGM") {
                    FGM3.text(data.results[i].value);
                } else if (data.results[i].datatype == "FGA") {
                    FGA3.text(data.results[i].value);
                } else if (data.results[i].datatype == "FGN") {
                    FGN3.text(data.results[i].value);
                } else if (data.results[i].datatype == "FMAXT") {
                    FMAXT3.text(data.results[i].value);
                } else if (data.results[i].datatype == "FMINT") {
                    FMINT3.text(data.results[i].value);
                } else if (data.results[i].datatype == "FSIGW") {
                    FSIGW3.text(data.results[i].value);
                    SIGW3.text(data.results[i].attributes.when);
                }
            }
        }
    }
}

function httpGetAsyncForLocation(locationID){

    var dateTime = new Date();
                
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth()+1;
    var month3 = dateTime.getMonth()+1;
    var day = dateTime.getDate();
    var day3 = dateTime.getDate()+2;

    if (month == 2 || month == 4 ||month == 6 || month == 9 || month == 11){
        if (day == 29){
            day3 = 1;
            month3 = month3 + 1;
        } else if (day == 30){
            day3 = 2;
            month3 = month3 + 1;
        }
    }

    if (month < 10){month = "0"+month;}

    if (day < 10){day = "0"+day;}

    var today = year+'-'+month+'-'+day;

    var day3rd = year+'-'+month3+'-'+day3;

    //var locationID = $('#foundID').textContent;
    var theUrl ="https://api.met.gov.my/v2/data?datasetid=FORECAST&datacategoryid=GENERAL&locationid="+locationID+"&start_date="+today+"&end_date="+day3rd;
                //Sample: https://api.met.gov.my/v2/data?datasetid=FORECAST&datacategoryid=GENERAL&locationid=LOCATION:"+locationID+"&start_date="+today+"&end_date="+today;

    $.ajax
    
    fetch(theUrl, options)
    .then(( res ) => {
            if (!res.ok) {
                alert("No Forecast Data for currrent location.");
                throw new Error("No Forecast Data for currrent location.");
            }
        return res.json();
    })
    .then( (data) => updateLocationInfo(data));

    $.ajax({
        url: theUrl,
        type: options.method,
        headers: options.headers,
        success: function (data) {
            updateLocationInfo(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 404) {
                alert('No Forecast Data for current location.');
            } else {
                alert('An error occurred: ' + errorThrown);
            }
        }
    });
}

$(document).ready(function() {
    $("#defaultOpen").trigger("click");
    displayTime();
    setInterval(displayTime, 1000);
});
