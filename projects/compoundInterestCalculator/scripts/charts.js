export let barChartCfg = {
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

export let pieChartCfg = {
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