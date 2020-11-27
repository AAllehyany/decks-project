import mongoose from 'mongoose';
import Joi from 'joi';

/**
 * Validation object for inserting deck to the database
 */
export const createDeckSchema = Joi.object({
    name: Joi.string().required(),
    game: Joi.string().required().valid('WS', 'FoW', 'YGO', 'VG'),
    cards: Joi.array().required(),
});

/**
 * Model for creating a new deck.
 */
export interface ICreateDeckInput {
    name: string,
    game: string,
    cards: Array<any>,
    code?: string
}

/**
 * Represents a deck in the database
 */
export const deckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    game: {
        type: String,
        enum: ['WS', 'VG', 'FoW'],
        required: true,
    },
    cards: [{
        type: mongoose.SchemaTypes.ObjectId, ref: 'Card'
    }]
});

export const DeckList = mongoose.model('DeckList', deckSchema);