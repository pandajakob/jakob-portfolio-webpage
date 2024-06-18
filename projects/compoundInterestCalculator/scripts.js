let dataPoints = [];
const tableElement = document.querySelector('table');
const timeHorizon = document.getElementById("timeHorizon");
const initialInvestment = document.getElementById("initInvestment");
const monthlyContribution = document.getElementById("monthlyContribution");
const yieldElement = document.getElementById("interestRate");
const annualTaxElement = document.getElementById("annualTax");
const taxRateElement = document.getElementById("taxRate");


const calcTax = (growth) => {
    const taxRate = parseFloat(taxRateElement.value / 100);
    console.log("taxRate", taxRate)
    console.log("taxcalc: ", growth*taxRate);
    
    return taxRate === 1 ? 0 : growth*taxRate;
}

const calcGrowth = (investment) => {
    const yield = parseFloat(yieldElement.value)/100+1;
    return investment*yield - investment  
}

const addDataPoints = () => {
    dataPoints = [];

    const yearCont = parseFloat(monthlyContribution.value*12);

    let totalVal = parseFloat(initialInvestment.value);
    let totalInterest = 0;
    let totalTax = 0;


    for (let i = 1; i <= timeHorizon.value; i++) {
        let growth = (i === 1 ? calcGrowth(totalVal + yearCont + totalInterest) : calcGrowth(totalVal+totalInterest));
        let tax = annualTaxElement.checked ? calcTax(growth) : 0;
        growth -= tax
        totalTax += tax
        totalInterest += growth;


        totalVal += yearCont;
        const dataPoint = {
            dataYear: `${i}`,
            dataValue: totalVal,
            dataInterest: totalInterest,
            dataTax: totalTax
        };
        dataPoints.push(dataPoint);

    }
    
};

const populateTable = () => {

    tableElement.innerHTML = " <tr> <th> Year </th><th> Investment </th><th> Interest </th><th> Tax </th><th> Balance </th> </tr>";

  for (const dataPoint of dataPoints) {
      let trElement = document.createElement('tr');
      let yearElement = document.createElement('td');
      yearElement.innerHTML = dataPoint.dataYear;

      let investElement = document.createElement('td');
      let interestElement = document.createElement('td');
      let taxElement = document.createElement('td');
      let totalElement = document.createElement('td');

      investElement.innerHTML = "$" + Math.round(dataPoint.dataValue);
      interestElement.innerHTML = "$" + Math.round(dataPoint.dataInterest);
      taxElement.innerHTML = "$" + Math.round(dataPoint.dataTax);
      totalElement.innerHTML = "$" + Math.round(dataPoint.dataValue+dataPoint.dataInterest - dataPoint.dataTax);

      trElement.appendChild(yearElement);
      trElement.appendChild(investElement);
      trElement.appendChild(interestElement);
      trElement.appendChild(taxElement);
      trElement.appendChild(totalElement);
      
      tableElement.appendChild(trElement);
  }
}

const addToTable = () => {
    addDataPoints();

    console.log(dataPoints);
     populateTable();
    let totalInvestment = parseFloat(timeHorizon.value)*parseInt(monthlyContribution.value)*12+parseInt(initialInvestment.value)
    let totalInterest = parseFloat(dataPoints[dataPoints.length-1].dataInterest)
    let totalTax = 0;


    if (!annualTaxElement.checked) {
        const tax = calcTax(totalInterest);
        totalInterest -= tax;
        totalTax = tax;
        dataPoints[dataPoints.length-1].dataTax = totalTax;
        dataPoints[dataPoints.length-1].dataInterest = totalInterest;
    } else {
      totalTax = parseFloat(dataPoints[dataPoints.length-1].dataTax)
    }

    console.log("Max value: " + dataPoints[dataPoints.length-1].dataValue);
    console.log("Investment: " + totalInvestment);
    console.log("Interest :" + totalInterest);
    console.log("Tax: " + totalTax);

    const totalReturn = Math.floor(totalInterest + totalInvestment - totalTax)
    document.getElementById("totalReturn").innerHTML = `Total investment: ${totalReturn} 💰`;

     setPieChartData([totalInvestment, totalInterest, totalTax]) 
    setBarChartData(dataPoints);
};




