import { invResults } from "./main.js";
let canvasElement = document.getElementById("canvasChart");
let pieCanvasElement = document.getElementById("pieChart");

let barChartCfg = {
  type: "bar",
  data: {
    datasets: [
      {
        label: "Investment",
        data: [],
        borderRadius: 5,
        backgroundColor: ["rgb(72, 149, 239, 0.8)"],
      },
      {
        label: "Interest",
        data: [],
        borderRadius: 5,
        backgroundColor: ["rgb(6, 214, 160, 0.8)"],
      },
      {
        label: "Tax",
        data: [],
        borderRadius: 5,
        backgroundColor: ["rgb(255,209,102,0.8)"],
      },
    ],
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "years",
          font: {
            size: 15,
            weight: 450,
          },
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Return 💰",
          font: {
            size: 15,
            weight: 450,
          },
        },
      },
    },
  },
};

let pieChartCfg = {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: [
          "rgb(72, 149, 239, 0.8)",
          "rgb(6, 214, 160, 0.8)",
          "rgb(255,209,102,0.8)",
        ],
      },
    ],
    labels: ["Investment", "Interest", "Tax"],
  },
};

let chart = new Chart(canvasElement, barChartCfg);
let pieChart = new Chart(pieCanvasElement, pieChartCfg);

const setBarChartData = (data) => {
  chart.data.labels = data.map((dp) => dp.dataYear);
  chart.data.datasets[0].data = data.map((dp) => parseFloat(dp.dataValue));
  chart.data.datasets[1].data = data.map((dp) => parseFloat(dp.dataInterest));
  chart.data.datasets[2].data = data.map((dp) => parseFloat(dp.dataTax));
  chart.update();
};

const setPieChartData = (data) => {
  pieChart.data.datasets[0].data = data;
  pieChart.update();
};

const populatePieChart = () => {
  let totalInvestment = parseFloat(invResults[invResults.length - 1].dataValue);

  let totalInterest = parseFloat(
    invResults[invResults.length - 1].dataInterest
  );

  let totalTax = 0;

  const totalReturn = Math.floor(totalInterest + totalInvestment - totalTax);
  document.getElementById(
    "totalReturn"
  ).innerHTML = `Total investment: ${totalReturn} 💰`;

  setPieChartData([totalInvestment, totalInterest, totalTax]);
  setBarChartData(invResults);
};

document.addEventListener("keypress", populatePieChart);
