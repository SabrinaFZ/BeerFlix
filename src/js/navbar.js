'use script';

import {showBeers} from './beers';


const navSearch = document.querySelector('#nav-search');
const searchButton = document.getElementById('search-button');
const closeIcon = document.querySelector('.fa-times');
const searchForm = document.querySelector('#search-form');
const searchBar = document.getElementById('search-bar');


searchButton.addEventListener('click', () => {
    toggleNavbar('close-search', 'open-search');
});

closeIcon.addEventListener('click', () => {
    searchBar.value = '';
    toggleNavbar('open-search', 'close-search');
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (searchBar.value !== ''){
        showBeers(searchBar.value);
    }    
})


const toggle = (element) => (previousClass, nextClass) => {
    element.classList.remove(previousClass);
    element.classList.add(nextClass);
}

const toggleNavbar = toggle(navSearch);

