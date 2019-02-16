'use strict';

import api from './api';
import { renderBeerInfo } from './detail_beer';
import { toggleNavbar } from './navbar';

const {getBeerInfo} = api();

const showMore = async (links) =>{
    links.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            let id = link.href.split('/').slice(-1)[0];
            try {
                let beer = await getBeerInfo(id);
                await renderBeerInfo(beer);
                toggleNavbar('show', 'hidden');
            } catch (e) {
                console.error(e);
            }
        })
    })
};



export {
    showMore
};