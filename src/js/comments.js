'use strict';

import api from './api';

const { addComment } =  api();

const toggle = (element, elementToHide) => {
    element.addEventListener('click', () => {
        elementToHide.classList.toggle('show');
    });
}

const postComments = async (comment, {beerId}, beersList) => {
    comment.addEventListener('keyup', async e => {
        let key = e.keyCode;
        if (key === 13) {
            let comments = await sendRequest(e, beerId, comment.value);
            let newComment = document.createElement('p');
            newComment.innerHTML = comment.value;
            beersList.appendChild(newComment);
        }
    });;
}

const sendRequest = async (e, id, comment) => {
    try {
        e.stopPropagation();
        let comments = await addComment(id, comment);
        return comments;
    } catch (e) {
        console.error(e);
    }
}

export {
    toggle,
    postComments
}

