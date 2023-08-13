function showForecast(name) {
    const thebox = document.getElementById('thebox');
    const statename = document.getElementById('statename');

    thebox.style.visibility="visible";
    thebox.style.opacity="1";

    statename.textContent = name;
    
    if (name == "Johor" ){
        var locationID = "1";
    } else if (name == "Kedah"){
        var locationID = "2";
    } else if (name == "Kelantan"){
        var locationID = "3";
    } else if (name == "Melaka"){
        var locationID = "6";
    } else if (name == "Negeri Sembilan"){
        var locationID = "7";
    } else if (name == "Pahang"){
        var locationID = "8";
    } else if (name == "Pulau Pinang"){
        var locationID = "9";
    } else if (name == "Perak"){
        var locationID = "10";
    } else if (name == "Perlis"){
        var locationID = "11";
    } else if (name == "Selangor"){
        var locationID = "15";
    } else if (name == "Terengganu"){
        var locationID = "16";
    } else if (name == "Sabah"){
        var locationID = "13";
    } else if (name == "Sarawak"){
        var locationID = "14";
    } else if (name == "Labuan"){
        var locationID = "5";
    }
    
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

    var theUrl ="https://api.met.gov.my/v2/data?datasetid=FORECAST&datacategoryid=GENERAL&locationid=LOCATION:"+locationID+"&start_date="+today+"&end_date="+today;

    httpGetAsync(theUrl);
    //"https://api.met.gov.my/v2/data?datasetid=FORECAST&datacategoryid=GENERAL&locationid=LOCATION:237&start_date=2022-04-28&end_date=2022-04-28"
}
  
function hideForecast() {
    const thebox = document.getElementById('thebox');

    thebox.style.visibility="hidden";
    thebox.style.opacity="0";
}

function httpGetAsync(theUrl){

    //var theUrl = "https://api.met.gov.my/v2.1/locations?locationcategoryid=TOWN&offset=0";

    const options = {
        method : "GET",
        mode: 'cors',
        headers: {
            Authorization: "METToken 63d724fba9f9323723b5ae28166a1f2db586747c",
            //METToken 84e08247cef2678af77f5f10c4fca798fc1a1a7a
            //METToken 63d724fba9f9323723b5ae28166a1f2db586747c
        }
    };
    
    fetch(theUrl, options)
    .then(( res ) => {
        return res.json();
    })
    .then( (data) => updateInfo(data));
}

function updateInfo(data){
    const FGM = document.getElementById('FGM');
    const FGA = document.getElementById('FGA');
    const FGN = document.getElementById('FGN');
    const FMAXT = document.getElementById('fmaxt');
    const FMINT = document.getElementById('fmint');
    const FSIGW = document.getElementById('fsigw');
    const SIGW = document.getElementById('fsigwTime');

    for (var i=0; i<data.results.length; i++) {
        for (var key in data.results[i]) {
            if (data.results[i].datatype == "FGM") {
                FGM.textContent = data.results[i].value;
            } else if (data.results[i].datatype == "FGA") {
                FGA.textContent = data.results[i].value;
            } else if (data.results[i].datatype == "FGN") {
                FGN.textContent = data.results[i].value;
            } else if (data.results[i].datatype == "FMAXT") {
                FMAXT.textContent = data.results[i].value;
            } else if (data.results[i].datatype == "FMINT") {
                FMINT.textContent = data.results[i].value;
            } else if (data.results[i].datatype == "FSIGW") {
                FSIGW.textContent = data.results[i].value;
                SIGW.textContent = data.results[i].attributes.when;
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
    var session = document.getElementById('session');

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

    document.getElementById('hours').innerHTML = hrs;
    document.getElementById('minutes').innerHTML = min;
    document.getElementById('seconds').innerHTML = sec;
    document.getElementById('day').innerHTML = date;
    document.getElementById('gifTime').innerHTML = date2;
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
        console.log("odd");
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

    const today = document.getElementById('day1')
    const tomorrow = document.getElementById('day2')
    const tomorrow2 = document.getElementById('day3')

    today.textContent = day1st;
    tomorrow.textContent = day2nd;
    tomorrow2.textContent = day3rd;

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(functionName).style.display = "block";
    evt.currentTarget.className += " active";
}

function searchLocation(){

    var status = false;

    var count = 0;
    for (var i = 0; i < 151; i=i+50){

        var townUrl = "https://api.met.gov.my/v2.1/locations?locationcategoryid=TOWN&offset=" + i;

        const options = {
            method : "GET",
            mode: 'cors',
            headers: {
                Authorization: "METToken 63d724fba9f9323723b5ae28166a1f2db586747c",
                //METToken 84e08247cef2678af77f5f10c4fca798fc1a1a7a
                //METToken 63d724fba9f9323723b5ae28166a1f2db586747c
            }
        };

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
    var theLocation = document.querySelector(".search-bar").value;

    for (var i=0; i<data.results.length; i++) {
        for (var key in data.results[i]) {
            if (data.results[i].name == theLocation) {
                
                locationID = data.results[i].id;
                const locationName = document.getElementById('foundLocation');

                locationName.textContent = data.results[i].name;

                break;
            } 
        }
    }
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

    const FGM1 = document.getElementById('locationFGM1');
    const FGA1 = document.getElementById('locationFGA1');
    const FGN1 = document.getElementById('locationFGN1');
    const FMAXT1 = document.getElementById('locationfmaxt1');
    const FMINT1 = document.getElementById('locationfmint1');
    const FSIGW1 = document.getElementById('locationfsigw1');
    const SIGW1 = document.getElementById('locationfsigwTime1');

    const FGM2 = document.getElementById('locationFGM2');
    const FGA2 = document.getElementById('locationFGA2');
    const FGN2 = document.getElementById('locationFGN2');
    const FMAXT2 = document.getElementById('locationfmaxt2');
    const FMINT2 = document.getElementById('locationfmint2');
    const FSIGW2 = document.getElementById('locationfsigw2');
    const SIGW2 = document.getElementById('locationfsigwTime2');

    const FGM3 = document.getElementById('locationFGM3');
    const FGA3 = document.getElementById('locationFGA3');
    const FGN3 = document.getElementById('locationFGN3');
    const FMAXT3 = document.getElementById('locationfmaxt3');
    const FMINT3 = document.getElementById('locationfmint3');
    const FSIGW3 = document.getElementById('locationfsigw3');
    const SIGW3 = document.getElementById('locationfsigwTime3');

    for (var i=0; i<data.results.length; i++) {
        for (var key in data.results[i]) {

            dataDate = data.results[i].date.slice(0,10);
            if (dataDate == day1st){
                if (data.results[i].datatype == "FGM") {
                    FGM1.textContent = data.results[i].value;
                } else if (data.results[i].datatype == "FGA") {
                    FGA1.textContent = data.results[i].value;
                } else if (data.results[i].datatype == "FGN") {
                    FGN1.textContent = data.results[i].value;
                } else if (data.results[i].datatype == "FMAXT") {
                    FMAXT1.textContent = data.results[i].value;
                } else if (data.results[i].datatype == "FMINT") {
                    FMINT1.textContent = data.results[i].value;
                } else if (data.results[i].datatype == "FSIGW") {
                    FSIGW1.textContent = data.results[i].value;
                    SIGW1.textContent = data.results[i].attributes.when;
                }
            } else if (dataDate == day2nd){
                if (data.results[i].datatype == "FGM") {
                    FGM2.textContent = data.results[i].value;
                } else if (data.results[i].datatype == "FGA") {
                    FGA2.textContent = data.results[i].value;
                } else if (data.results[i].datatype == "FGN") {
                    FGN2.textContent = data.results[i].value;
                } else if (data.results[i].datatype == "FMAXT") {
                    FMAXT2.textContent = data.results[i].value;
                } else if (data.results[i].datatype == "FMINT") {
                    FMINT2.textContent = data.results[i].value;
                } else if (data.results[i].datatype == "FSIGW") {
                    FSIGW2.textContent = data.results[i].value;
                    SIGW2.textContent = data.results[i].attributes.when;
                }
            } else if (dataDate == day3rd){
                if (data.results[i].datatype == "FGM") {
                    FGM3.textContent = data.results[i].value;
                } else if (data.results[i].datatype == "FGA") {
                    FGA3.textContent = data.results[i].value;
                } else if (data.results[i].datatype == "FGN") {
                    FGN3.textContent = data.results[i].value;
                } else if (data.results[i].datatype == "FMAXT") {
                    FMAXT3.textContent = data.results[i].value;
                } else if (data.results[i].datatype == "FMINT") {
                    FMINT3.textContent = data.results[i].value;
                } else if (data.results[i].datatype == "FSIGW") {
                    FSIGW3.textContent = data.results[i].value;
                    SIGW3.textContent = data.results[i].attributes.when;
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

    //var locationID = document.getElementById('foundID').textContent;
    var theUrl ="https://api.met.gov.my/v2/data?datasetid=FORECAST&datacategoryid=GENERAL&locationid="+locationID+"&start_date="+today+"&end_date="+day3rd;
                //https://api.met.gov.my/v2/data?datasetid=FORECAST&datacategoryid=GENERAL&locationid=LOCATION:"+locationID+"&start_date="+today+"&end_date="+today;

    const options = {
        method : "GET",
        mode: 'cors',
        headers: {
            Authorization: "METToken 84e08247cef2678af77f5f10c4fca798fc1a1a7a",
            //METToken 84e08247cef2678af77f5f10c4fca798fc1a1a7a
            //METToken 63d724fba9f9323723b5ae28166a1f2db586747c
        }
    };
    
    fetch(theUrl, options)
    .then(( res ) => {
            if (!res.ok) {
                alert("No Forecast Data for currrent location.");
                throw new Error("No Forecast Data for currrent location.");
            }
        return res.json();
    })
    .then( (data) => updateLocationInfo(data));
}

window.onload = function () {
    start();
};

function start() {
    setInterval(displayTime, 10);
    document.getElementById("defaultOpen").click();
}
