import { invResults } from "./main.js";
import { barChartCfg, pieChartCfg } from "./charts.js";

const resultsTable = document.getElementById("resultsTable");

const populateTable = () => {
  resultsTable.innerHTML =
    " <tr> <th> Year </th><th> Investment </th><th> Interest </th><th> Tax </th><th> Balance </th> </tr>";

  for (const dataPoint of invResults) {
    const trElement = document.createElement("tr");
    const yearElement = document.createElement("td");
    yearElement.innerHTML = dataPoint.year;

    const investElement = document.createElement("td");
    const interestElement = document.createElement("td");
    const taxElement = document.createElement("td");
    const totalElement = document.createElement("td");

    investElement.innerHTML = "$" + Math.round(dataPoint.totalInvAmount);
    interestElement.innerHTML = "$" + Math.round(dataPoint.totalInterestEarned);
    taxElement.innerHTML = "$" + Math.round(dataPoint.totalTaxPaid);
    totalElement.innerHTML =
      "$" +
      Math.round(
        dataPoint.totalInvAmount +
          dataPoint.totalInterestEarned -
          dataPoint.totalTaxPaid
      );

    trElement.appendChild(yearElement);
    trElement.appendChild(investElement);
    trElement.appendChild(interestElement);
    trElement.appendChild(taxElement);
    trElement.appendChild(totalElement);

    resultsTable.appendChild(trElement);
  }
};

const canvasElement = document.getElementById("canvasChart");
const pieCanvasElement = document.getElementById("pieChart");

let barChart = new Chart(canvasElement, barChartCfg);
let pieChart = new Chart(pieCanvasElement, pieChartCfg);

const setBarChartData = () => {
  barChart.data.labels = invResults.map((dp) => dp.year);
  barChart.data.datasets[0].data = invResults.map((dp) =>
    parseFloat(dp.totalInvAmount)
  );
  barChart.data.datasets[1].data = invResults.map((dp) =>
    parseFloat(dp.totalInterestEarned)
  );
  barChart.data.datasets[2].data = invResults.map((dp) =>
    parseFloat(dp.totalTaxPaid)
  );
  barChart.update();
};

const setPieChartData = () => {
  const lastDp = invResults[invResults.length - 1]; //gets the last datapoint in the invResults array

  // sets the "total investment" h3"
  const totalReturn = Math.floor(
    lastDp.totalInterestEarned + lastDp.totalInvAmount - lastDp.totalTaxPaid
  );

  document.getElementById(
    "totalReturn"
  ).innerHTML = `Total investment: ${totalReturn} 💰`;

  pieChart.data.datasets[0].data = [
    lastDp.totalInvAmount,
    lastDp.totalInterestEarned,
    lastDp.totalTaxPaid,
  ];
  pieChart.update();
};

function setUI() {
  populateTable();
  setBarChartData();
  setPieChartData();
}

document.addEventListener("keypress", setUI);
