function add_to_datalist(list) {
    const datalist = document.getElementById('kommuner');
    list.forEach((data) => {
        let option = document.createElement('option')
        option.value = data.Kommune;
        datalist.appendChild(option);
    });
    
}

 function fetch_skat_data() {
    {
        const kommune_file_url = 'skat_data.json';
        fetch(kommune_file_url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                skat_data = data;
                add_to_datalist(data.kommuneskat);
            })
            .catch(error => {
                console.error(error);
            });
    }
}

function get_kommune_data(kommune) {
    return skat_data['kommuneskat'].find((k)=>{return k.Kommune == kommune })
}

let skat_data = [];

let dkk = new Intl.NumberFormat('da', {style: 'currency', currency: 'DKK'}).format(1234.56)


document.addEventListener('DOMContentLoaded', () => fetch_skat_data());
document.getElementById('form').addEventListener('submit', calculate_tax )

let calc_tax_data = {};

function calculate_tax(e) {
    e.preventDefault()
    calc_tax_data = {};

    const kommune = document.getElementById('kommune').value;
    const indkomst = parseFloat(document.getElementById('indkomst_fuld').value);

    const medlem_kirke = document.getElementById('kirkeskat').checked;

    const kommune_data = get_kommune_data(kommune);
    console.log('kommune _data: ', kommune_data)

    const kommuneskat = parseFloat(kommune_data.Skatte)/100;
    
    const kirkeskat = medlem_kirke ? parseFloat(kommune_data.Kirke)/100 : 0;
    const bundskat = parseFloat(skat_data.bundskat_pct)/100;
    const topskat = parseFloat(skat_data.topskat_pct)/100;
    const trækprocent = (bundskat + kommuneskat + kirkeskat);
    

    let indkomst_state = indkomst;

    // udregn am-bidrag–
    calc_tax_data['am-bidrag'] = indkomst*(skat_data.ambidrag_pct/100);
    indkomst_state -= calc_tax_data['am-bidrag'];

    // fjern personfradrag
    const brugt_personfradrag = skat_data.personfradrag < indkomst_state ? skat_data.personfradrag : indkomst_state;
    indkomst_state -= brugt_personfradrag;
    
    // udregn trækprocent inden topskat
  
    if (indkomst_state <= skat_data.topskat_grnse) {
        calc_tax_data['bundskat'] = indkomst_state*bundskat;
        calc_tax_data['kirkeskat'] = indkomst_state*kirkeskat;
        calc_tax_data['kommuneskat'] = indkomst_state*kommuneskat;
        indkomst_state *= trækprocent;
    } else {
            calc_tax_data['topskat'] = (indkomst_state - skat_data.topskat_grnse)*(topskat);
        calc_tax_data['bundskat'] = indkomst_state*bundskat;
        calc_tax_data['kommuneskat'] = indkomst_state*kommuneskat;
        calc_tax_data['kirkeskat'] = skat_data.topskat_grnse*kirkeskat;
        indkomst_state -= (calc_tax_data['topskat'] + calc_tax_data['bundskat'] + calc_tax_data['kommuneskat'] + calc_tax_data['kirkeskat'])
    }

    // tilføj fradrag igen
    indkomst_state += brugt_personfradrag;
    
    calc_tax_data['bruttoløn'] = indkomst_state;
}

export { calc_tax_data };



