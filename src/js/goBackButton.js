'use strict';

import { toggleNavbar } from './navbar';
import { render, toggleBeers } from './beers';

const goBack = async (element) => {
    element.addEventListener('click', async() => {
        try{
            let currentBeers = JSON.parse(localStorage.getItem('currentBeers')) ? JSON.parse(localStorage.getItem('currentBeers')) : [];
            let totalBeers = JSON.parse(localStorage.getItem('beers'));
            const detailBeer = document.getElementById('detail-beer');
            detailBeer.parentNode.removeChild(detailBeer);
            await render(currentBeers.length !== 0 ? currentBeers : totalBeers);
            toggleBeers('hide', 'show');
            toggleNavbar('hidden', 'show');
        }catch(e){
            console.error(e);
        }
    });
}

export {
    goBack
};