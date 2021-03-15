var d;
var lat;
var lon;

window.onload=function(){
   
    $.get(
        `js/Data.json`,
        function (data) {
          
          SetData(data);
        }
     );
      
      
    navigator.geolocation.getCurrentPosition(function (position) {

         lat = position.coords.latitude.toString();

         lon = position.coords.longitude.toString();
        getWeather(lat, lon);
    });

    setTimeout(clock, 1000);
    
    var mySlider1 = document.getElementById('slider1');
    mySlider1.addEventListener('input', (ev) => {
        
    document.getElementById("body_id").style.filter = `brightness(${ev.target.value}%)`;
     document.getElementById("body_id").style.backdropFilter = `brightness(${ev.target.value}%)`;
 
    console.log( ev.target.value);
      })
    rangesliderJs.create(mySlider1);

    var mySlider2 = document.getElementById('slider2');
    rangesliderJs.create(mySlider2);

  
  
      
      $('.ui.dropdown').dropdown();
    
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
     
    $('#weatherToggle').click(function(){

      if ($(this).attr( "checked" )){

        this.checked = false;
        $('#wicon').removeAttr("src");
        $('#wicon').hide(); 
    $('#tempNow').text('');
        $(this).removeAttr('checked');
      } else {
        $('#wicon').show(); 
        getWeather(lat, lon);
        $(this).attr('checked', true)
        this.checked = true;
      }
    });
    const circle = new CircularProgressBar('pie');
    forTariff();
    $('.dropCur').dropdown({
       
      
        onChange: function(value, text, $selectedItem) {
          $('#inText').text(value+120);
         
           up(value);
        },
      });

    
    
}

function  forTariff() {
    var today= new Date();
    if (today.getMonth()>=0&&today.getMonth()<=2)  {
        $('#currentQuarter').text('(Jan-Mar)');
        $('#End_of').text('March');
        const start=new Date(`01/01/${today.getFullYear()}`);
        const end = new Date(`03/31/${today.getFullYear()}`);
        dayProgressStart(start,end,today);
        $("#dayProgressStart").text('Jan 1');
        $("#dayProgressEnd").text('Mar 31');
    } else  if (today.getMonth()>=3&&today.getMonth()<=5)
    {
        $('#currentQuarter').text('(Apr-Jun)');
        $('#End_of').text('June');
       
        const start=new Date(`04/01/${today.getFullYear()}`);
        const end = new Date(`06/30/${today.getFullYear()}`);
        dayProgressStart(start,end,today);
        $("#dayProgressStart").text('Apr 1');
        $("#dayProgressEnd").text('Jun 31');
    }else  if (today.getMonth()>=6&&today.getMonth()<=9)
    {
        $('#currentQuarter').text('(Jul-Sep)');
        $('#End_of').text('September');
      
        const start=new Date(`07/01/${today.getFullYear()}`);
        const end = new Date(`09/30/${today.getFullYear()}`);
        dayProgressStart(start,end,today);
        $("#dayProgressStart").text('Jul 1');
        $("#dayProgressEnd").text('Sep 31');
    }else{
        $('#currentQuarter').text('(Oct-Dec)');
        $('#End_of').text('December');
      
        const start=new Date(`10/01/${today.getFullYear()}`);
        const end = new Date(`12/31/${today.getFullYear()}`);
        dayProgressStart(start,end,today);
        $("#dayProgressStart").text('Oct 1');
        $("#dayProgressEnd").text('Dec 31');
    }
}
function   dayProgressStart(start,end,today) {
    const diffTimeAll = Math.abs(end - start);
    const diffDaysAll = Math.ceil(diffTimeAll / (1000 * 60 * 60 * 24));
    const diffTime = Math.abs(end - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    var percent=Math.round((diffDaysAll-diffDays)*100/diffDaysAll);
    $('#dayProgress').progress({
        percent: percent
      });
    $('#progressingDay').addClass(`p-${percent}`); 
    $('#dayLabel').text(diffDays);
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
 
  $('#curQuareterLarge').text(value);
  $('#curQuareterSmall').text(value);
  currentVal(value);
 
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
    document.getElementById("month").innerHTML = `${getMONTHS(date).slice(0,3)} ${date.getUTCDate()} `;
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
