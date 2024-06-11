

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
            year: year,
            value: totalValue
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
        yearElement.innerHTML = dataPoint.year;
        let amountElement = document.createElement('th');
        amountElement.innerHTML = "$" + Math.round(dataPoint.value);
        trElement.appendChild(yearElement);
        trElement.appendChild(amountElement);
        tableElement.appendChild(trElement);
    }
};




document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addToTable();
    }
});

addDataPoints();
