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
                label: '',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        {  label: '',
            data: [0,77, 76, 309, 40, 50,477,58,49,265,58,432],
            borderColor: 'rgba(75, 0, 192, 1)',
                backgroundColor: 'rgba(75, 19, 192, 0.2)'
        }]
        },
        options: { 
            tooltips: {
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

