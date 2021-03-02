// window.onload=function(){
    
       
        
    
// }


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

