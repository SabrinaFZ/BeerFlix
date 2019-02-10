'use script';

let beers = document.querySelector('main');

const goBack = async (element, listBeers) => {
    element.addEventListener('click', async () => {
        beers.innerHTML = '';
        beers.append(listBeers);
    });
}

export {
    goBack
};