'use strict';

const spinner = document.querySelector('.loader');

const toggle = (element) => (previousClass, nextClass) => {
    element.classList.remove(previousClass);
    element.classList.add(nextClass);
}

const toggleSpinner = toggle(spinner);

export {
    toggleSpinner
};