'use script';

import { toggleNavbar } from './navbar';

let beers = document.querySelector('main');

const goBack = async (element, listBeers) => {
    element.addEventListener('click', async () => {
        beers.innerHTML = '';
        beers.append(listBeers);
        toggleNavbar('hidden', 'show');
    });
}

export {
    goBack
};