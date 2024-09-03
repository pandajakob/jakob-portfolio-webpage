import { calc_tax_data } from "./scripts.js";
console.log(calc_tax_data, 'c_ calc_tax_data')
const pie_chart_canvas = document.getElementById("pie_chart_canvas");
const form_element = document.getElementById('form');

let pie_chart_cfg = {
  type: 'pie',
  data: {
    datasets: [{
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }],
  },
};

let pie_chart = new Chart(pie_chart_canvas, pie_chart_cfg)

const set_pie_chart_data = () => {
  pie_chart.data.datasets[0].data = Object.values(calc_tax_data);
  pie_chart.data.labels = Object.keys(calc_tax_data);
  pie_chart.update();
}

let dkk = new Intl.NumberFormat('da', { style: 'currency', currency: 'DKK' });

function setUI() {
  const bruttøløn_elmnt = document.getElementById('bruttoløn');
  const nettoløn = parseInt(document.getElementById('indkomst_fuld').value);
  const ambidrag_elmnt = document.getElementById('ambidrag');



  const result = document.getElementById('result');
  result.innerHTML = "";

  const nettoløn_elmnt = document.createElement('h3');
  nettoløn_elmnt.id = 'nettoløn';
  nettoløn_elmnt.innerHTML = `Nettoløn: ${dkk.format(nettoløn)}`;

  result.appendChild(nettoløn_elmnt);
  for (const [key, value] of Object.entries(calc_tax_data)) {
    if (value) {
    const newElement = document.createElement(key == 'bruttoløn' ? 'h3' : 'p');
    newElement.id = key;
    newElement.innerHTML = ` - ${key} ${dkk.format(value)}`;
    result.appendChild(newElement);
    }
  }



  set_pie_chart_data();

}

form_element.addEventListener('submit', setUI);


