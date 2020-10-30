const knex = require('../database');
const tableName = 'weiss_cards';

const addCardService = async (card, user_id, title_id) => {
    card.user_id = user_id;
    card.title_id = title_id;
    return knex(tableName).insert(card);
}

const addManyService = async (cards, user_id, title_id) => {
    cards.forEach(c => {
        c.user_id = user_id;
        c.title_id = title_id;
    });

    return knex(tableName).insert(cards);

}

const searchCardsService = async (searchQuery) => {
    return knex.select().table(tableName);
};

module.exports = {
    addCardService,
    addManyService,
    searchCardsService,
}