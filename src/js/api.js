'use script';

const api = (API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/beers') => {
    return {
        getBeers: async (query) => {
            try {
                let url = query ? API_URL+'?search='+query+'&limit=10': API_URL;
                let response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": '9X7100H-M6B481J-NHJZJTK-V7PQZMG'
                    }
                })
                let data = await response.json();
                let beers = await data.beers
                return beers;
                //llamar a get/beers
            } catch (e) {
                console.error(e);
            }
        }
    }
}

export default api;