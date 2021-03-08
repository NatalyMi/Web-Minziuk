var currency="$";
var period;
var chart;
var Data;
function periodChange(per) {
  period=per;
 
}
function currentVal(item){
    currency=item;
}

function tmp(data) {
 Data=data;
  Createcharts(data);
}
function updateSerie() {
  chart.updateOptions({
    xaxis: {
      categories: category()
      
    },
  
  });
  chart.updateSeries([{
    data:  Usage(Data)
  },{
    data:  Target(Data)
  }])


}

function Createcharts(data) {
  

 
   chart = new ApexCharts(document.querySelector("#chart"), options = {
        
        
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

      categories: category()
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
  
   var chart1 = new ApexCharts(document.querySelector("#chart1"), options={
        
        
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
      data: data.Current_usage_monthlyGas
    },
      {
        name: 'Target amount',
        data: data.Target_amount_monthlyGas
      
     
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

      categories: category()
    },
    yaxis: {
        categories: [0, 100, 200, 300, 400, 500]
      },
    tooltip: {
        shared:false,
        intersect: false,
        custom: function({series, seriesIndex, dataPointIndex, w}) {
            setVal(series[seriesIndex][dataPointIndex]);
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
  setVal(data);
   return data.Current_usage_monthlyGas;
 
 }
  else
 {
  console.log(period);
   return data.Current_usage_daylyGas;
 }
}
function category() {
  if(period=='monthly')
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

function setVal(data){
  var sum=0;
  data.Current_usage_monthlyGas.forEach(element => {
    sum+=element;
  });
    document.getElementById("litre").innerHTML=sum/12+' litre';
   
   
document.getElementById("price").innerHTML=cost(sum)+currency;
}
function cost(litre){
return litre*28;
}
