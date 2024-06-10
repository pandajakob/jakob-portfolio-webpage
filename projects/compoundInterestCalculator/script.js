const timeHorizon = document.getElementById("timeHorizon");
const initialInvestment = document.getElementById("initInvestment");
let yield = 2;
const tableElement = document.querySelector('table')

const updateTextInput = (value) => {
    document.getElementById("rangeValue").innerHTML = value + "%"
    yield = value/100+1;
    console.log("year" + timeHorizon.value);
    console.log("initialInvestment" + initialInvestment.value);
}

function addToTable() {   
    tableElement.innerHTML = ""
    for (let i = 0; i<timeHorizon.value; i++) {
        let trElement = document.createElement('tr');
        let yearElement = document.createElement('th');
        yearElement.innerHTML = i;
        let amountElement = document.createElement('th');
        amountElement.innerHTML = (i*initialInvestment.value*yield);
        trElement.appendChild(yearElement)
        trElement.appendChild(amountElement)
        tableElement.appendChild(trElement)
    }

};

