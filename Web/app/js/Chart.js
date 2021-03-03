var currency="$";
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
function renderChart(data, labels) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                showLine: true ,
                label: 'litre',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        {  label: '$',
            data: [0,77, 76, 309, 40, 50,477,58,49,265,58,432],
            borderColor: 'rgba(75, 0, 192, 1)',
                backgroundColor: 'rgba(75, 19, 192, 0.2)'
        }]
        },
        options: { 
            legend: {
                display: false,
               
                // labels: {
                //     fontColor: 'rgb(255, 99, 132)'
                // }
            },
            // tooltips: {
               
            //     displayColors: false,
            //     backgroundColor: 'rgba(255,255,255,1)',
            //     bodyFontColor:'rgba(0,0,0,1)',
            //     callbacks: {
            //         // afterBody: function(tooltipItem, chart) {
            //         // return {
            //         //     borderColor: 'rgb(255, 0, 0)',
            //         //     backgroundColor: 'rgb(255, 0, 0)'
            //         // };
            //     },
            //     //displayColors:true,
            //    // mode: 'nearest',
            //    intersect:false,
            //     mode: 'index',
            //    // axis: 'x'
            //    //mode:'x',
            // },           
            tooltips: {
                custom: function(tooltipModel) {
                    // Tooltip Element
                    var tooltipEl = document.getElementById('chartjs-tooltip');
    
                    // Create element on first render
                    if (!tooltipEl) {
                        tooltipEl = document.createElement('div');
                        tooltipEl.id = 'chartjs-tooltip';
                        tooltipEl.innerHTML = "<table></table>"
                        document.body.appendChild(tooltipEl);
                    }
    
                    // Hide if no tooltip
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
                    }
    
                    // Set caret Position
                    tooltipEl.classList.remove('above', 'below', 'no-transform');
                    if (tooltipModel.yAlign) {
                        tooltipEl.classList.add(tooltipModel.yAlign);
                    } else {
                        tooltipEl.classList.add('no-transform');
                    }
    
                    function getBody(bodyItem) {
                        return bodyItem.lines;
                    }
    
                    // Set Text
                    if (tooltipModel.body) {
                        var titleLines = tooltipModel.title || [];
                        var bodyLines = tooltipModel.body.map(getBody);
    
                        var innerHtml = '<thead>';
    
                        titleLines.forEach(function(title) {
                            innerHtml += '<tr><th>' + title + '</th></tr>';
                        });
                        innerHtml += '</thead><tbody>';
    
                        bodyLines.forEach(function(body, i) {
                            var colors = tooltipModel.labelColors[i];
                            var style = 'background:' + colors.backgroundColor;
                            style += '; border-color:' + colors.borderColor;
                            style += '; border-width: 2px';
                            var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
                            innerHtml += '<tr><td>' + span + body + '</td></tr>';
                        });
                        innerHtml += '</tbody>';
    
                        var tableRoot = tooltipEl.querySelector('table');
                        tableRoot.innerHTML = innerHtml;
                    }
    
                    // `this` will be the overall tooltip
                    var position = this._chart.canvas.getBoundingClientRect();
    
                    // Display, position, and set styles for font
                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
                    tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
                    tooltipEl.style.fontFamily = tooltipModel._fontFamily;
                    tooltipEl.style.fontSize = tooltipModel.fontSize;
                    tooltipEl.style.fontStyle = tooltipModel._fontStyle;
                    tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                }
            },
            scales: {
                
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize:100,
                    }
                }]                
            }
        },
    });
   
}

//////////////
// <!DOCTYPE HTML>
//{ <html>
//<head>
 // <script type="text/javascript">
//   window.onload = function () {
//     var t=15;
//     var chart = new CanvasJS.Chart("chartContainer",
//     {
//       title: {
//         text: "Monthly Downloads"
//       },
//       axisX:{
       
//        gridThickness: 1,
//        tickLength: 1,
//         interval:1,
//         intervalType: "month",
//         valueFormatString:"MMM",
        
//       },
//        axisY:{
       
//        gridThickness: 1,
//        tickLength: 1,
//         interval:100,
//         intervalType: "number",
//        maximun:500,
        
//       },
//       toolTip:{   
// 			content:` <span id="litre" >{y}</span> litre <br> ${t}$`      
// 		},
//         data: [
//       {
//         type: "area",
//         dataPoints: [//array

//         { x: new Date(2012, 00, 1), y: 260 },
//         { x: new Date(2012, 01, 1), y: 380 },
//         { x: new Date(2012, 02, 1), y: 430 },
//         { x: new Date(2012, 03, 1), y: 290},
//         { x: new Date(2012, 04, 1), y: 410 },
//         { x: new Date(2012, 05, 1), y: 450 },
//         { x: new Date(2012, 06, 1), y: 86 },
//         { x: new Date(2012, 07, 1), y: 64 },
//         { x: new Date(2012, 08, 1), y: 53 },
//         { x: new Date(2012, 12, 1), y: 60 }
//         ]
//       }
//       ]
//     });

//     chart.render();
//   }
  //</script>
//   <script type="text/javascript" src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
//</head>
{/* <body>
  <div id="chartContainer" style="height: 300px; width: 100%;">
  </div>
</body> */}
//</html> */}