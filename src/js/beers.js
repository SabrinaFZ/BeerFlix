'use strict';

import api from './api';
import { showMore }  from './moreInfo';
import { toggleSpinner } from './spinner';

const { getBeers } = api();
const beersContainer = document.getElementById('beers');
const beerList = document.getElementById('beers-list');
const defaultPicture = './../images/default.jpg'

const toggle = (element) => (previousClass, nextClass) => {
    element.classList.remove(previousClass);
    element.classList.add(nextClass);
}

const toggleBeers = toggle(beersContainer);

const showBeers = async (query) => {
    try{
        toggleBeers('show', 'hide');
        toggleSpinner('hide', 'show');
        let beers = await getBeers(query);
        toggleSpinner('show', 'hide');
        toggleBeers('hide', 'show');
        render(beers);
    }   
    catch(e){
        console.error(e);
    }
}

showBeers();

const render = async (beers) => {
    localStorage.setItem('beers', JSON.stringify(beers));
    beerList.innerHTML = '';
    try{
        if (beers.length !== 0) {
            beers.map((beer) => {
                let templateBeer = getTemplateBeers(beer);
                beerList.innerHTML += templateBeer;
            });
            const moreInfoButton = document.querySelectorAll('.beer-more-info a');
            await showMore(moreInfoButton);
        } else {
            let templateEmpty = getTemplateEmpty();
            beerList.innerHTML = templateEmpty;
        }
    } catch(e){
        console.error(e);
    }
    
}

const getTemplateBeers = ({beerId, name, image}) => (
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

const getTemplateEmpty = () => (
    `
    <div id="no-beer-list">
        <i class="far fa-frown"></i>
        <p>No beers!</p>
    </div>
    `
);

export {
    toggleBeers,
    showBeers,
    render
}
