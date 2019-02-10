'use script';

import api from './api';
import { showMore }  from './moreInfo';

const { getBeers } = api();
const beerList = document.getElementById('beers-list');
const defaultPicture = './../images/default.jpg'

const showBeers = async (query) => {
    try{
        let beers = await getBeers(query);
        beerList.innerHTML = '';
        beers.map((beer) => {
            let templateBeer = renderBeers(beer);           
            beerList.innerHTML += templateBeer;
        });

        const moreInfoButton = document.querySelectorAll('.beer-more-info a');
        await showMore(moreInfoButton);
    }   
    catch(e){
        console.error(e);
    }
}

showBeers();

const renderBeers = ({beerId, name, image}) => (
    `
        <article class="container-principal">
            <div class="beer-img">
                <img src="${image ? image : defaultPicture}" alt="${name}_img">
            </div>
            <div class="beer-name">
                <h2>${name}</h2>
            </div>
            <div class="beer-more-info">
                <a href="/beers/${beerId}">
                    <i class="fas fa-chevron-right"></i>
                </a>
            </div>
        
        </article>
    `
);

export {
    showBeers
}
