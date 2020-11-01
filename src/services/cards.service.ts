import knex from 'knex';
const tableName = 'weiss_cards';
import {Card} from '../schemas/card_schema';

export const addCardService = async ( card: any, user_id: number, title_id: number) => {
    const newCard = new Card(card);
    return newCard.save();
}

export const addCardsMany = async ( cards: Array<any>, user_id: string) => {
    Card.insertMany(cards);
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


export const searchCardsService = async ( searchQuery: SearchSchema) => {
    const query = {};
    const cost = {};
    const level = {};
    const power = {};
    return Card.find(query);
};
