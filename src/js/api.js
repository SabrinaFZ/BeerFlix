const api = (API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1') => {
    return {
        getBeers: async () => {
            try {
                let response = await fetch(API_URL + '/beers', {
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