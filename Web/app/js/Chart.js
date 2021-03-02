window.onload=function(){
    
        data = [0,54, 200, 300, 400, 500,77,5,4,265,5,85];
        labels =  ["Ja", "Fe", "Ma", "Ap", "Ma", "Ju", "Ji","Au","Se", "Oc", "No", "De"];
        renderChart(data, labels);

        
    
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
            tooltips: {
                displayColors: false,
                backgroundColor: 'rgba(255,255,255,1)',
                bodyFontColor:'rgba(0,0,0,1)',
                callbacks: {
                    // afterBody: function(tooltipItem, chart) {
                    // return {
                    //     borderColor: 'rgb(255, 0, 0)',
                    //     backgroundColor: 'rgb(255, 0, 0)'
                    // };
                },
                //displayColors:true,
               // mode: 'nearest',
               intersect:false,
                mode: 'index',
               // axis: 'x'
               //mode:'x',
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

