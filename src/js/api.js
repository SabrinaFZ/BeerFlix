'use scrict';

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
                });
                let data = await response.json();
                let beers = await data.beers;
                return beers;
            } catch (e) {
                console.error(e);
            }
        },
        getBeerInfo: async(query) => {
            try{
                let url = query ? API_URL + `/${query}` : API_URL;
                let response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": API_KEY
                    }
                });
                let data = await response.json();
                let beer = await data.beer;
                return beer;
            }catch(e){
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
            let likes = await data.beer.likes;
            return likes;
        },
        addComment: async(query, comment) => {
            let url = API_URL + `/${query}/comment`;
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": API_KEY
                },
                body: JSON.stringify({
                    comment: comment
                })
            });
            let data = await response.json();
            let comments = await data.beer.comments;
            return comments;
        }
    }
}

export default api;