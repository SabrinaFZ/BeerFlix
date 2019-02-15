'use strict';

import { render } from './beers';

const selectorDate = document.getElementById('first-brewer');

selectorDate.addEventListener('change', () => {
    let yearSelected = selectorDate.value;
    if (yearSelected !== ''){
        let selectedBeers = filterByDate(yearSelected);
        render(selectedBeers);
    }
});

const filterByDate = (year) => {
    let beers = JSON.parse(localStorage.getItem('beers'));
    let selectedBeers = [];

    if(beers.length > 0){
        beers.map((beer) => {
            let yearFirstBrewed = beer.firstBrewed.split('/')[1];
            if(yearFirstBrewed === year){
                selectedBeers.push(beer);
            }
        });
    }

    return selectedBeers;
};

const cleanSelector = () =>{
    selectorDate.value = '';
};

export {
    cleanSelector
};

