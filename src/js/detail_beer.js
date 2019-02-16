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
    const commentForm = document.querySelector('#beer-comments-form-textarea');
    const commentsList = document.querySelector('.beer-comments-list');
    toggle(commentsButton, commentsList);
    await postComments(commentForm, beer, commentsList);
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
                    <span>${comment.length}</span>
                </article>
                <article class="beer-comments-secondary">
                    <h3>Comments</h3>
                    <div class="beer-comments-form">
                        <textarea id="beer-comments-form-textarea" rows "4" cols="5" maxlength="150"> </textarea>
                    </div>
                    <div class="beer-comments-list"> 
                        ${mapComments(comment)}
                    </div>
                </article>
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
    if(comments.length !==0){
        commentsMapped = comments.map(comment => (
            `
            <p>${comment.comment}</p>
            `
        )).join('');
    } else {
        commentsMapped = `<p>No comments!</p>`
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