let dataPoints = [];
const tableElement = document.querySelector('table')
const timeHorizon = document.getElementById("timeHorizon");
const initialInvestment = document.getElementById("initInvestment");
const monthlyContribution = document.getElementById("monthlyContribution")
let yield = 0.0;

const updateTextInput = (value) => {
    document.getElementById("rangeValue").innerHTML = value + "%"
    yield = value/100+1;
    console.log("year: " + timeHorizon.value);
    console.log("initialInvestment: " + initialInvestment.value);
}
updateTextInput(0);


let canvasElement = document.getElementById("canvasChart");
let pieCanvasElement = document.getElementById("pieChart");

let barChartCfg = {
    type: 'bar',
    data: {
      datasets: [{
        data: dataPoints.map(dp=>dp.y),
      }],
      labels: dataPoints.map(dp=>dp.x)
    },
   
}

let pieChartCfg = {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [0,0],
      }],
      labels: ["Total investment", "Total Interest Earned"]
    },
}

let chart = new Chart(canvasElement, barChartCfg);
let pieChart = new Chart(pieCanvasElement, pieChartCfg)



const addDataPoints = () => {
    dataPoints = [];
    let totalValue = parseFloat(initialInvestment.value);
    const yearlyContribution = parseFloat(monthlyContribution.value*12);

    for (let year = 1; year <= timeHorizon.value; year++) {
        if (year === 1) {
            totalValue = (totalValue + yearlyContribution) * yield;
        } else {
            totalValue = totalValue*yield+yearlyContribution;
        }
        const dataPoint = {
            x: `${year}`,
            y: totalValue
        };
        dataPoints.push(dataPoint);
    }
    
};

const addToTable = () => {
    addDataPoints();
    console.log(dataPoints);
    tableElement.innerHTML = "<tr> <th> Year </th> <th> Amount </th> </tr>";

    for (const dataPoint of dataPoints) {
        let trElement = document.createElement('tr');
        let yearElement = document.createElement('th');
        yearElement.innerHTML = dataPoint.x;
        let amountElement = document.createElement('th');
        amountElement.innerHTML = "$" + Math.round(dataPoint.y);
        trElement.appendChild(yearElement);
        trElement.appendChild(amountElement);
        tableElement.appendChild(trElement);
    }
    chart.data.labels = dataPoints.map(dp => dp.x);
    chart.data.datasets[0].data = dataPoints.map(dp => parseFloat(dp.y));
    chart.update();


    let totalInvestment = parseInt(timeHorizon.value)*parseInt(monthlyContribution.value)*12+parseInt(initialInvestment.value)
    let totalInterest = parseInt(dataPoints[dataPoints.length-1].y - totalInvestment)

    console.log("max" + dataPoints[dataPoints.length-1].y)
    console.log("Tinv" + totalInvestment)
    console.log("TI" + totalInterest)
    
    pieChart.data.datasets[0].data = [totalInvestment, totalInterest];
    pieChart.update();
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addToTable();
    }
});



