const knex = require('../database');
const tableName = 'weiss_cards';

const addCardService = (card, user_id, title_id) => {
    card.user_id = user_id;
    card.title_id = title_id;
    return knex(tableName).insert(card);
}


const searchCardsService = (searchQuery) => {

};

module.exports = {
    addCardService,
}