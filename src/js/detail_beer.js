'use strict';

import { postLikes } from './likes';
import { goBack } from './goBackButton';
import {toggleBeers} from './beers';

const main = document.querySelector('main');

const renderBeerInfo = async (beer) => {
    let template = renderTemplate(beer);
    let element = document.createElement('div');
    element.setAttribute('id', 'detail-beer')
    element.innerHTML = template;
    toggleBeers('show','hide');
    main.append(element);    
    const like = document.querySelector('.beer-likes');
    const goBackButton = document.querySelector('.go-back-button');
    goBack(goBackButton);
    await postLikes(like, beer);
    
}

const renderTemplate = ({ name, description, ingredients, price, likes, comments}) => (
`   
   <div class="container">
            <div class="go-back-button">
                <a>
                    <i class="fas fa-chevron-left"></i>
                </a>
            </div>
            <div class="beer-info">
                <div class="beer-name">
                    <h2>${name}</h2>
                </div>
                <div class="beer-desc">
                    <p>
                        ${description}
                    </p>
                </div>
                <div class="beer-ingredients">
                    <h3>Ingredients</h3>
                    <ul>
                        ${mapIngredients(ingredients)}
                    </ul>
                </div>
                <div class="beer-price">
                    <h3>Price</h3>
                    <p>${price} $</p>
                </div>
                <div class="beer-likes">
                    <i class="fas fa-thumbs-up"></i>
                    <span>${likes}</span>
                </div>
                <div class="beer-comments">
                    <i class="fas fa-comment"></i>
                    <span>${comments.length}</span>
                </div>
            </div>
        </div>
`
);

const mapIngredients = (ingredients) => {
    let malt, hops, yeast;

    ({ malt, hops, yeast } = ingredients);

    let maltTemplate = renderIngredients(malt);
    let hopsTemplate = renderIngredients(hops);
    let yeastTemplate = renderIngredients(yeast);

    return maltTemplate + hopsTemplate + yeastTemplate;
}

const renderIngredients = (type) => {
    let template;
    if (type) {
        if (Array.isArray(type) && type.length !== 0) {
            template = type.map((ing) => (
                `
        <li><i class="fas fa-circle"></i>${ing.name}</li>
        `
            )).join('');
        }
        else if (!Array.isArray(type)) {
            template = `
                <li><i class="fas fa-circle"></i>${type}</li>
            `
        }
    }

    return template;
}

export {
    renderBeerInfo
};