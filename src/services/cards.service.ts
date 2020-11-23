import {Card} from '../schemas/card_schema';
import { SearchSchema } from '../schemas/search-schema';

const esr = require('escape-string-regexp');

export const addCardService = async ( card: any, user_id: number, title_id: number) => {
    const newCard = new Card(card);
    return newCard.save();
}

export const addCardsMany = async ( cards: Array<any>, user_id: string) => {
    Card.insertMany(cards);
}


export interface SearchQuery {
    [key: string]: number | string | SearchQuery | string[]
}

interface QueryOptions {
    limit: number
    skip: number
}

export const searchCardsService = async ( searchQuery: SearchSchema) => {
    const query = {
        "$and": [] as Array<SearchQuery>
    };

    const perPage = 50;


    if(searchQuery.name) {
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

    if(searchQuery.title_code) {
        query["$and"].push({title_code: {"$in": searchQuery.title_code.split(',')}})
    }

    const options = {} as QueryOptions;

    if(searchQuery.skip) {
        options.skip = perPage * Number(searchQuery.skip);
    }

    options.limit = 50;

    return Card.find(query["$and"].length > 0 ? query : {}).skip(options.skip).limit(options.limit).exec();
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