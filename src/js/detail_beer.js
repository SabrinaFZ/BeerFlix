'use strict';

import { postLikes } from './likes';
import { postComments, toggle } from './comments';
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
    addEvents(beer);    
}

const addEvents = (beer) => {
    addLikesEvents(beer);
    addGoBackEvent();
    addCommentsEvents(beer);
}

const addLikesEvents = async(beer) => {
    const likeButton = document.querySelector('.beer-likes');
    await postLikes(likeButton, beer);
}

const addGoBackEvent = () => {
    const goBackButton = document.querySelector('.go-back-button');
    goBack(goBackButton);
}

const addCommentsEvents = async (beer) => {
    const commentsButton = document.querySelector('.beer-comments');
    const commentsSection = document.querySelector('.beer-comments-section');
    toggle(commentsButton, commentsSection, beer);
    await postComments(commentsButton, commentsSection, beer);
}

const renderTemplate = ({ name, description, ingredients, price, likes, comment}) => (
`   
   <div class="container">
            <div class="go-back-button">
                <a>
                    <i class="fas fa-chevron-left"></i>
                </a>
            </div>
            <section class="beer-info">
                <article class="beer-name">
                    <h2>${name}</h2>
                </article>
                <article class="beer-desc">
                    <p>
                        ${description}
                    </p>
                </article>
                <article class="beer-ingredients">
                    <h3>Ingredients</h3>
                    <ul>
                        ${mapIngredients(ingredients)}
                    </ul>
                </article>
                <article class="beer-price">
                    <h3>Price</h3>
                    <p>${price} $</p>
                </article>
                <article class="beer-likes">
                    <i class="fas fa-thumbs-up"></i>
                    <span>${likes}</span>
                </article>
                <article class="beer-comments">
                    <i class="fas fa-comment"></i>
                    <span>${comment ? comment.length : 0}</span>
                </article>
                <section class="beer-comments-section">
                    <h3>Comments</h3>
                    <article class="beer-comments-form">
                        <textarea id="beer-comments-form-textarea" rows "4" cols="5" maxlength="150"> </textarea>
                        <p class="beer-comments-info">Pulse enter to post the comment</p>
                    </article>
                    <article class="beer-comments-list"> 
                        ${mapComments(comment)}
                    </article>
                </section>
            </section>
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

const mapComments = (comments) => {
    let commentsMapped;
    if(comments && comments.length !==0){
        commentsMapped = comments.map(comment => (
            `
            <p>${comment.comment}</p>
            `
        )).join('');
    } else {
        commentsMapped = '';
    }
    return commentsMapped;
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