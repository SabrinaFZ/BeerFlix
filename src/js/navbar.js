'use script';

const navSearch = document.querySelector('#nav-search');
const searchIcon = document.querySelector('.fa-search');
const closeIcon = document.querySelector('.fa-times');

searchIcon.addEventListener('click', () => {
    toggleNavbar('close-search', 'open-search');
});

closeIcon.addEventListener('click', () => {
    toggleNavbar('open-search', 'close-search');
});


const toggle = (element) => (previousClass, nextClass) => {
    element.classList.remove(previousClass);
    element.classList.add(nextClass);
}

const toggleNavbar = toggle(navSearch);

