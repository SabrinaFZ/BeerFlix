'use strict';

import api from './api';

const { addComment } =  api();

const toggle = (element, elementToHide) => {
    console.dir(elementToHide)
    element.addEventListener('click', () => {
        elementToHide.classList.toggle('show');
    });
}

const postComments = async (commentButton, commentsSection, { beerId }) => {
    let textarea = commentsSection.children[1].children[0];
    textarea.addEventListener('keyup', async e => {
        let key = e.keyCode;
        if (key === 13) {
            let comments = await sendRequest(e, beerId, textarea.value);
            let beersList = commentsSection.children[2];
            let newComment = document.createElement('p');
            newComment.innerHTML = textarea.value;
            beersList.appendChild(newComment);
            commentButton.lastElementChild.innerHTML = parseInt(commentButton.lastElementChild.innerHTML) + 1;
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

