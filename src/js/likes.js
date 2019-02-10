'use script';

import api from './api';

const { addLike } = api();

const postLikes = async (like, {beerId}) => {
    like.addEventListener('click', async e => {
        let numberLikes = await sendRequest(e, beerId);
        like.lastElementChild.innerHTML = parseInt(like.lastElementChild.innerHTML) + 1;
    }, false);
}

const sendRequest = async(e, id) => {
    try {
        e.stopPropagation();
        let numberLikes = await addLike(id);
        return numberLikes;    
    } catch (e) {
        console.error(e);
    }
}


export {
    postLikes
};