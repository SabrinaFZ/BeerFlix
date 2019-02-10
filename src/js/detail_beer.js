'use script';

import { postLikes } from './likes';

const defaultPicture = './../images/default.jpg'

const renderBeerInfo = (beer) => {
    let beerInfo = document.querySelector('main');
    let template = renderTemplate(beer);
    console.log(template)
    beerInfo.innerHTML = '';
    beerInfo.innerHTML = template;
    const like = document.querySelector('.beer-likes');
    postLikes(like, beer);
}

const renderTemplate = ({ name, image, description, ingredients, price, likes, comments}) => (
`
    <div class="container">
        <div class="beer-img">
            <img src="${image ? image : defaultPicture}" alt="${name}_img" srcset="">
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