import { invResults } from "./main.js";


const resultsTable = document.getElementById("resultsTable")

const populateTable = () => {
  resultsTable.innerHTML =
      " <tr> <th> Year </th><th> Investment </th><th> Interest </th><th> Tax </th><th> Balance </th> </tr>";
  
    for (const dataPoint of invResults) {
      const trElement = document.createElement("tr");
      const yearElement = document.createElement("td");
      yearElement.innerHTML = dataPoint.dataYear;
  
      const investElement = document.createElement("td");
      const interestElement = document.createElement("td");
      const taxElement = document.createElement("td");
      const totalElement = document.createElement("td");
  
      investElement.innerHTML = "$" + Math.round(dataPoint.dataValue);
      interestElement.innerHTML = "$" + Math.round(dataPoint.dataInterest);
      taxElement.innerHTML = "$" + Math.round(dataPoint.dataTax);
      totalElement.innerHTML =
        "$" +
        Math.round(
          dataPoint.dataValue + dataPoint.dataInterest - dataPoint.dataTax
        );
  
      trElement.appendChild(yearElement);
      trElement.appendChild(investElement);
      trElement.appendChild(interestElement);
      trElement.appendChild(taxElement);
      trElement.appendChild(totalElement);
  
      resultsTable.appendChild(trElement);
    }
    console.log("invResults2", invResults);

};

document.addEventListener("keypress", populateTable);
