var currency="$";
function currentVal(item){
    currency=item;
}
// window.onload=function(){
   
    var options = {
        
        
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
          data: [5,54, 200, 300, 400, 450,77,5,4,265,5,85]},
          {
            name: 'Target amount',
            data: [11, 32, 45, 32, 34, 52, 41,5,54, 200, 300, 400]
          
         
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
   
          categories: ["Ja", "Fe", "Ma", "Ap", "Ma", "Ju", "Ji","Au","Se", "Oc", "No", "De"]
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
      }
      
     
    
    
        
    
 //}
function setVal(litre){
    document.getElementById("litre").innerHTML=litre+' litre';
document.getElementById("price").innerHTML=cost(litre)+currency;
}
function cost(litre){
return litre*28;
}
