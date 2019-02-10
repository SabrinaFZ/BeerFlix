'use script';

import api from './api';
import { renderBeerInfo } from './detail_beer';

const {getBeerInfo} = api();

const showMore = async (links) =>{
    links.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            let id = link.href.split('/').slice(-1)[0];
            try {
                let beer = await getBeerInfo(id);
                console.log(beer);
                await renderBeerInfo(beer);
            } catch (e) {
                console.error(e);
            }
        })
    })
};

export {
    showMore
};