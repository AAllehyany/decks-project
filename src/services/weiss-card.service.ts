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

export interface SearchSchema {
    name?: string,
    card_type?: number,
    color?: number,
    soul?: number,
    min_cost?: number,
    max_cost?: number,
    min_level?: number,
    max_level?: number,
    min_power?: number,
    max_power?: number,
    level_limit?: number
}


export const searchCardsService = async (db: knex, searchQuery: SearchSchema) => {
    return db.select().table(tableName).where(builder => {
        if(searchQuery.name) 
            builder.whereRaw('LOWER(name) LIKE ?', `%${searchQuery.name.toLowerCase()}%`);
        
        if(searchQuery.card_type)
            builder.where('card_type', searchQuery.card_type)
        
        if(searchQuery.color) 
            builder.where('color', searchQuery.color)
        
        if(searchQuery.soul)
            builder.where('soul', searchQuery.soul)
        
        if(searchQuery.min_cost)
            builder.where('cost', '>=', searchQuery.min_cost)
        
        if(searchQuery.max_cost)
            builder.where('cost', '<=', searchQuery.max_cost)

        if(searchQuery.min_level){
            builder.where('level', '>=', searchQuery.min_level)}
        
        if(searchQuery.max_level)
            builder.where('level', '<=', searchQuery.max_level)

        if(searchQuery.min_power)
            builder.where('power', '>=', searchQuery.min_power)
        
        if(searchQuery.max_power)
            builder.where('power', '<=', searchQuery.max_power)
    });
};
