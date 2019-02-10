'use script';

const API_KEY = '9X7100H-M6B481J-NHJZJTK-V7PQZMG';

const api = (API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/beers') => {
    return {
        getBeers: async (query) => {
            try {
                let url = query ? API_URL+'?search='+query+'&limit=10': API_URL;
                let response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": API_KEY
                    }
                })
                let data = await response.json();
                let beers = await data.beers
                return beers;
            } catch (e) {
                console.error(e);
            }
        },
        addLike: async(query) => {
            let url = API_URL+`/${query}/like`;
            let response = await fetch (url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": API_KEY
                }
            });
            let data = await response.json();
            console.log(data)
            let likes = await data.beer.likes;
            return likes;
        }
    }
}

export default api;