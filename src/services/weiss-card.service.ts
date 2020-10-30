import knex from 'knex';
const tableName = 'weiss_cards';

export const addCardService = async (db: knex, card: any, user_id: string, title_id: string) => {
    card.user_id = user_id;
    card.title_id = title_id;
    return db(tableName).insert(card);
}

export const addManyService = async (db: knex, cards: Array<any>, user_id: string) => {
    cards.forEach(c => {
        c.user_id = user_id;
        c.title_id = 1;
    });

    return db(tableName).insert(cards);

}

export const searchCardsService = async (db: knex, searchQuery: object) => {
    return db.select().table(tableName);
};
