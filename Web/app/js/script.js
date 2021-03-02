window.onload=function(){
    navigator.geolocation.getCurrentPosition(function (position) {
       
        var lat = position.coords.latitude.toString();
      
        var lon = position.coords.longitude.toString();
        getWeather(lat, lon);
    });
    
    setTimeout(clock, 1000);
    
    $('.ui.dropdown').dropdown();
   
  
f();

}

function clock()
{
    var date =new Date();
    $('#timeNow').append(`${date.getHours()}:${date.getMinutes()}`);
    
}

function getWeather(lat, lon) {
    $.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ua&APPID=e49e1f56190e3b14ecb27c17e406bc2d`,
        function (data, status) {
            //console.log(status);
            //console.log(data);
            currentWeatherInformation(data);
        });

}
function currentWeatherInformation(data) {

    let icon = data.weather[0].icon;
    var icon_url = "http://openweathermap.org/img/w/" + icon + ".png";
    let tempC = convertKelvinToCelsius(data.main.temp);
   
   
   
   
    $('#wicon').attr("src", icon_url);
    $('#tempNow').append(`${tempC}<sup>o</sup>C`);
  

}
function convertKelvinToCelsius(value) {
    return Math.round(value - 273.15);
}
function getCurrentDate(date) {
    optionsDate = {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit'
    };
    return date.toLocaleString('uk', optionsDate);
}
function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var session = "AM"; 
    if(h == 0){
        h = 12;
    }
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    var time = h + ":" + m ;
    document.getElementById("MyClockDisplay").innerHTML = `${time} <sup style="font-size:18px ; top:-40px;">${session}</sup>`;
    document.getElementById("day").innerHTML = `${getWeekDay(date).slice(0,3)} `;
    document.getElementById("month").innerHTML = `${getMONTHS(date).slice(0,3)} ${date.getDay()} `;
    setTimeout(showTime, 1000);
    
}

showTime();
function getWeekDay(date) {
    
    optionsDate = {
       
       weekday:'long'
    };
    return date.toLocaleString('eng', optionsDate);
}
function getMONTHS(date) {
    
    optionsDate = {
       
       month:'long'
    };
    return date.toLocaleString('eng', optionsDate);
}
function f(){
var colors = JSC.getPalette('default'); 
  
var chart = JSC.chart('chartDiv', { 
  debug: true, 
  type: 'area', 
  title_label_text: 
    'Monthly <span style="color:' + 
    colors[0] + 
    '"><b>Purchases</b></span> vs. <span style="color:' + 
    colors[1] + 
    '"><b>Rent</b></span>', 
  legend_visible: false, 
  yAxis: { formatString: 'c' }, 
  
  xAxis: { 
    crosshair_enabled: true, 
    scale: { type: 'time' } 
  }, 
  
  defaultSeries: { 
    shape_opacity: 0.3, 
    defaultPoint_marker: { 
      fill: 'white', 
      type: 'circle', 
      outline: { width: 2 } 
    } 
  }, 
  
  series: [ 
    { 
      name: 'Purchases', 
  
      points: [ 
        ['1/1/2020', 29.9], 
        ['2/1/2020', 97.5], 
        ['3/1/2020', 110.4], 
        ['4/1/2020', 129.2], 
        ['5/1/2020', 144.0], 
        ['6/1/2020', 176.0] 
      ] 
    }, 
    { 
      name: 'Rent', 
  
      points: [ 
        ['1/1/2020', 86.9], 
        ['2/1/2020', 79.5], 
        ['3/1/2020', 95.4], 
        ['4/1/2020', 97.2], 
        ['5/1/2020', 123.0], 
        ['6/1/2020', 111.0] 
      ] 
    } 
  ] 
}); 
}