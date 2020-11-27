import {Card} from '../schemas/card_schema';
import { SearchSchema } from '../schemas/search-schema';

const esr = require('escape-string-regexp');

/**
 * Adds a single card to the db
 * @param card the card to add to DB
 * @param user_id user id of person/bot adding card
 * @param title_id the expansion for the card, currently only used for Weiss.
 */
export const addCardService = async ( card: any, user_id: number, title_id: number) => {
    const newCard = new Card(card);
    return newCard.save();
}

/**
 * To add multiple cards to database
 * @param cards Array of cards
 * @param user_id user who added cards
 */
export const addCardsMany = async ( cards: Array<any>, user_id: string) => {
    Card.insertMany(cards);
}

/**
 * Represents the search query received by user.
 * It is essentially a map of string to multiple types
 */
export interface SearchQuery {
    [key: string]: number | string | SearchQuery | string[]
}

/**
 * QueryOptions for pagination purposes.
 */
interface QueryOptions {
    limit: number
    skip: number
}

/**
 * Filters cards based on given filters, limits default to 50.
 * @param searchQuery Filters for searching cards
 */
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

    if(searchQuery.trigger) {
        query["$and"].push({triggers: searchQuery.trigger})
    }

    const options = {} as QueryOptions;

    if(searchQuery.skip) {
        options.skip = perPage * Number(searchQuery.skip);
    }

    

    options.limit = 50;

    return Card.find(query["$and"].length > 0 ? query : {}).skip(options.skip).limit(options.limit).exec();
};

/**
 * Gets all cards with IDs in the array. Used to check validity of 
 * cards to be added to a deck.
 * @param cardIds ids of cards to fetch from DB
 */
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