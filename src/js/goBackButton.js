'use strict';

import { toggleNavbar } from './navbar';
import { render, toggleBeers } from './beers';

const goBack = async (element) => {
    element.addEventListener('click', async() => {
        try{
            const detailBeer = document.getElementById('detail-beer');
            detailBeer.parentNode.removeChild(detailBeer);
            await render(JSON.parse(localStorage.getItem('beers')));
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