const api_key = "RGAPI-17d7319b-75a3-4c58-8b71-08842a22d429";
let puuid = '';


window.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        get_puuid();
    }
})

async function get_puuid() {
    const base_url = 'https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/'
    const tagline = document.getElementById('tagline').value
    const game_name = document.getElementById('game_name').value;
    const query_params = `${game_name}/${tagline}/?api_key=${api_key}`;
    const urlToFetch = base_url+query_params;
    
    try {
    const response = await fetch(urlToFetch);
    
        if (response.ok) {
            const json_response = await response.json();
            puuid = json_response.puuid
            get_summoner();

        }
    }

    catch(error) {
        console.log('error', error);
    }
}


async function get_summoner() {
    const region = document.getElementById('lol-regions').value;
    const base_url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/`
    const query_params = `${puuid}/?api_key=${api_key}`;
    const urlToFetch = base_url+query_params;

    try {
        const response = await fetch(urlToFetch);

        if (response.ok) {
            const json_response = await response.json();

            const summoner_level_elmnt = document.getElementById('summoner_level')
            summoner_level_elmnt.innerHTML = `summoner level: ${json_response.summonerLevel}`;
        }
    }
    catch(error) {
        console.log(error);
    }
}




