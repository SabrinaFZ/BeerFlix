'use script';

import api from './api';

const { addLike } = api();

const postLikes = async (likes, likesIdList) => {
    likes.forEach((like, index) => {
        like.addEventListener('click', async e => {
            let numberLikes = await sendRequest(e, likesIdList[index]);
            like.lastElementChild.innerHTML = parseInt(like.lastElementChild.innerHTML)+1;
        }, false);
    });
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