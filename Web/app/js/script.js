var d;
window.onload=function(){
   
    $.get(
        `js/Data.json`,
        function (data) {
          
          SetData(data);
        }
     );
      
      
    navigator.geolocation.getCurrentPosition(function (position) {

        var lat = position.coords.latitude.toString();

        var lon = position.coords.longitude.toString();
        getWeather(lat, lon);
    });

    setTimeout(clock, 1000);
    var mySlider1 = document.getElementById('slider1');
    rangesliderJs.create(mySlider1);

    var mySlider2 = document.getElementById('slider2');
    rangesliderJs.create(mySlider2);

    const circle = new CircularProgressBar('pie');
  //  Data();
    
    // var chart = new ApexCharts(document.querySelector("#chart"), options);
    //   chart.render();
    //   var chart1 = new ApexCharts(document.querySelector("#chart1"), options);
    //   chart1.render();
      
      $('.ui.dropdown').dropdown();
      $('.dropCur').dropdown({
       
      
        onChange: function(value, text, $selectedItem) {
          $('#inText').text(value+120);
         
           up(value);
        },
      });
      $('.dropdownGas').dropdown({
       
      
        onChange: function(value, text, $selectedItem) {
            periodUp(value);
            updateSerie();
            
        },
      });
     
      $('.dropdownElectric').dropdown({
       
      
        onChange: function(value, text, $selectedItem) {
            periodUp2(value);
            updateSerie2();
            
        },
      });
      periodUp( $('.dropdownGas').dropdown('get value'));
      periodUp2( $('.dropdownElectric').dropdown('get value'));
     up( $('.dropCur').dropdown('get value'));
    // $('#rG1').click(function(){

    //   if ($(this).attr( "checked" )){

    //     this.checked = false;

    //     $(this).removeAttr('checked');
    //   } else {
    //     $(this).attr('checked', true)
    //     this.checked = true;
    //   }
    // });
    // $('#rB1').click(function(){

    //   if ($(this).attr( "checked" )){

    //     this.checked = false;

    //     $(this).removeAttr('checked');
    //   } else {
    //     $(this).attr('checked', true)
    //     this.checked = true;
    //   }
    // });

    

}
function periodUp(param) {
    $('#periodLabel').text(param);
    periodChange( param);
}
function periodUp2(param) {
    $('#periodLabel2').text(param);
    periodChange2( param);
}
function up(value){
  $('#inText').text(value+120);
  currentVal(value);
 // chart.updateOptions({  });
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
