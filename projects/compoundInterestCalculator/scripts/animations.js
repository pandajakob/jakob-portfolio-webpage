const chartButton = document.getElementById("chartButton");
const tableButton = document.getElementById("tableButton");
const pieButton = document.getElementById("pieButton");

const chartElement = document.getElementById("canvasChart");
const tableElement = document.querySelector("table");
const pieElement = document.getElementById("pieChart");

const setVisibility = (view) => {
  switch (view) {
    case "chart":
      chartElement.style.opacity = "1";
      tableElement.style.opacity = "0";
      pieElement.style.opacity = "0";

      chartElement.style.zIndex = "1";
      pieElement.style.zIndex = "-1";
      tableElement.style.zIndex = "0";

      chartButton.style.backgroundColor = "rgb(72, 149, 239, 0.8)";
      tableButton.style.backgroundColor = "white";
      pieButton.style.backgroundColor = "white";

      break;
    case "table":
      tableElement.style.opacity = "1";
      chartElement.style.opacity = "0";
      pieElement.style.opacity = "0";

      pieElement.style.zIndex = "0";
      chartElement.style.zIndex = "-1";
      tableElement.style.zIndex = "1";

      tableButton.style.backgroundColor = "rgb(72, 149, 239, 0.8)";
      chartButton.style.backgroundColor = "white";
      pieButton.style.backgroundColor = "white";
      break;
    case "pie":
      pieElement.style.opacity = "1";
      chartElement.style.opacity = "0";
      tableElement.style.opacity = "0";

      pieElement.style.zIndex = "1";
      chartElement.style.zIndex = "-1";
      tableElement.style.zIndex = "0";

      pieButton.style.backgroundColor = "rgb(72, 149, 239, 0.8)";
      chartButton.style.backgroundColor = "white";
      tableButton.style.backgroundColor = "white";
      break;
  }
};



chartButton.addEventListener("click", ()=>{setVisibility("chart")});
tableButton.addEventListener("click", ()=>{setVisibility("table")});
pieButton.addEventListener("click", () => {setVisibility("pie")});