var currency="$";
var period;
var period2;
var chart;
var chart1;
var Data;
function periodChange(per) {
  period=per;
 
}
function periodChange2(per) {
  period2=per;
 
}
function currentVal(item){
    currency=item;
   if(Data!=null)
   {
     Usage(Data);
    Usage2(Data);
   }
}

function SetData(data) {
 Data=data;
  Createcharts(data);
}
function updateSerie() {
  chart.updateOptions({
    xaxis: {
      categories: category(period)
      
    },
  
  });
  chart.updateSeries([{
    data:  Usage(Data)
  },{
    data:  Target(Data)
  }])
}
function updateSerie2() {
  chart1.updateOptions({
    xaxis: {
      categories: category(period2)
      
    },
  
  });
  chart1.updateSeries([{
    data:  Usage2(Data)
  },{
    data:  Target2(Data)
  }])
}

function Createcharts(data) {
   chart = new ApexCharts(document.querySelector("#chart"), options = {
        
    
      colors: ['#59c7e1', '#85dcc9'],
    
    chart: {
        toolbar: {
            show: false,
        },
      type: 'area',
      zoom: {
        enabled: false
      },
      
    },
    grid: {
        show: true,
        borderColor: '#e5f3f7',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
            lines: {
                show: true
            }
        },   
       
       
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetY: -35,
        offsetX: 22,
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        labels: {
            colors: '#9da8bc',
           
        },
        inverseOrder: true,
        
      },
    dataLabels: {
        enabled: false,
      },
    series: [{
      name: 'Current usage',
      data: Usage(data) 
    },
      {
        name: 'Target amount',
        data: Target(data)
      
     
    }],
    stroke: {
        curve: 'straight'
      },
      subtitle: {
        text: `.`,
        align: 'left',
        margin: 10,
        offsetX: 20,
        offsetY: 30,
        floating: false,
        style: {
          fontSize:  '12px',
          fontWeight:  'normal',
          fontFamily:  undefined,
          color:  '#fff'
        },
    },
    
    xaxis: {
        axisBorder: {
            show: true,
            color: '#78909C',
      height: 1,
      width: '100%',
      offsetX: 0,
      offsetY: 0
        },
       
  crosshairs: {
    show: false,  
 },

      categories: category(period)
    },
    yaxis: {
        categories: [0, 100, 200, 300, 400, 500]
      },
    tooltip: {
        shared:false,
        intersect: false,
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          
            return '<div class="arrow_box">' +
              '<span>' + series[seriesIndex][dataPointIndex] +' litre'+'<br>'+cost(series[seriesIndex][dataPointIndex])+currency +'</span>' +
              '</div>'
          },
          
    }
  });
  chart.render(); 
  
    chart1 = new ApexCharts(document.querySelector("#chart1"), options={
      colors: ['#59c7e1', '#85dcc9'],
    chart: {
        toolbar: {
            show: false,
        },
      type: 'area',
      zoom: {
        enabled: false
      },
      
    },
    grid: {
        show: true,
        borderColor: '#e5f3f7',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
            lines: {
                show: true
            }
        },   
       
       
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetY: -35,
        offsetX: 22,
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        labels: {
            colors: '#9da8bc',
           
        },
        inverseOrder: true,
        
      },
    dataLabels: {
        enabled: false,
      },
      series: [{
        name: 'Current usage',
        data: Usage2(data) 
      },
        {
          name: 'Target amount',
          data: Target2(data)
        
       
      }],
    stroke: {
        curve: 'straight'
      },
      subtitle: {
        text: `.`,
        align: 'left',
        margin: 10,
        offsetX: 20,
        offsetY: 30,
        floating: false,
        style: {
          fontSize:  '12px',
          fontWeight:  'normal',
          fontFamily:  undefined,
          color:  '#fff'
        },
    },
    
    xaxis: {
        axisBorder: {
            show: true,
            color: '#78909C',
      height: 1,
      width: '100%',
      offsetX: 0,
      offsetY: 0
        },
       
  crosshairs: {
    show: false,  
 },

      categories: category(period2)
    },
    yaxis: {
        categories: [0, 100, 200, 300, 400, 500]
      },
    tooltip: {
        shared:false,
        intersect: false,
        custom: function({series, seriesIndex, dataPointIndex, w}) {
           
            return '<div class="arrow_box">' +
              '<span>' + series[seriesIndex][dataPointIndex] +' litre'+'<br>'+cost(series[seriesIndex][dataPointIndex])+currency +'</span>' +
              '</div>'
          },
          
    }
  });
  chart1.render();
}
function Usage(data) {
  if(period=='monthly')
 {  console.log(period);
  setVal(data.Current_usage_monthlyGas);
   return data.Current_usage_monthlyGas;
 
 }
  else
 {
  console.log(period);
  setVal(data.Current_usage_daylyGas);
   return data.Current_usage_daylyGas;
 }
}
function Usage2(data) {
  if(period2=='monthly')
 {  console.log(period);
  setVal2(data.Current_usage_monthlyElec);
   return data.Current_usage_monthlyElec;
 
 }
  else
 {
  console.log(period);
  setVal2(data.Current_usage_daylyElec);
   return data.Current_usage_daylyElec;
 }
}

function category(per) {
  if(per=='monthly')
  return ["Ja", "Fe", "Ma", "Ap", "Ma", "Ju", "Ji","Au","Se", "Oc", "No", "De"];
  else
  return ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
}
function Target(data) {
  if(period=='monthly')
  return data.Target_amount_monthlyGas;
  else
  return data.Target_amount_daylyGas;
}
function Target2(data) {
  if(period2=='monthly')
  return data.Target_amount_monthlyElec;
  else
  return data.Target_amount_daylyElec;
}
function setVal2(data){
  var sum=0;
  data.forEach(element => {
    sum+=element;
  });
    document.getElementById("kWh").innerHTML=Math.round(sum/12)+' kWh';
   
   
document.getElementById("price2").innerHTML=cost(sum)+currency;
}
function setVal(data){
  var sum=0;
  data.forEach(element => {
    sum+=element;
  });
    document.getElementById("litre").innerHTML=Math.round(sum/12)+' litre';
   
   
document.getElementById("price").innerHTML=cost(sum)+currency;
}
function cost(litre){
return litre*28;
}
