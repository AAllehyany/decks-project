import { Mongoose } from 'mongoose';
import {Card} from '../schemas/card_schema';
import {Document} from 'mongoose';

const esr = require('escape-string-regexp');

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
    level_limit?: number,
    game?: string,
}

export interface SearchQuery {
    [key: string]: number | string | SearchQuery
}

export const searchCardsService = async ( searchQuery: SearchSchema) => {
    const query = {
        "$and": [] as Array<SearchQuery>,
    };
    const cost = {"$and": [] as Array<any>};
    const level = {};
    const power = {};

    if(searchQuery.name) {
        //const escaped = EscapeRegex(`${searchQuery.name}`);
        query["$and"].push({"name": {"$regex": esr(searchQuery.name), $options: 'i'}});
    }

    if(searchQuery.color) {
        query["$and"].push({"color": searchQuery.color})
    }

    if(searchQuery.card_type) {
        query["$and"].push({"card_type": searchQuery.card_type})
    }

    if(searchQuery.game) {
        query["$and"].push({"game": searchQuery.game.toUpperCase()})
    }

    if(searchQuery.soul) {
        query["$and"].push({"soul": searchQuery.soul})
    }

    if(searchQuery.min_cost) {
        query["$and"].push({"cost": {"$gte": searchQuery.min_cost}})
    }

    if(searchQuery.max_cost) {
        query["$and"].push({"cost": {"$lte": searchQuery.max_cost}})
    }

    if(searchQuery.min_level) {
        query["$and"].push({"level": {"$gte": searchQuery.min_level}})
    }

    if(searchQuery.max_level) {
        query["$and"].push({"level": {"$lte": searchQuery.max_level}})
    }

    if(searchQuery.min_power) {
        query["$and"].push({"power": {"$gte": searchQuery.min_power}})
    }

    if(searchQuery.max_power) {
        query["$and"].push({"power": {"$lte": searchQuery.max_power}})
    }

    return Card.find(query["$and"].length > 0 ? query : {});
};

export const fetchCards = async (cardIds: Array<string>) => {
    const list = [] as any;

    for(const cardId of cardIds) {
        const card = await Card.findById(cardId).exec();
        if(card == null) {
            throw Error('No such card found');
        }
        list.push(card);
    }

    return list;
}