import mongoose from 'mongoose';

/**
 * Generic schema for cards in the database.
 * Allows for flexible cards.
 */
export const cardSchema = new mongoose.Schema({
    game: {
        type: String,
        required: true,
        enum: ['WS', 'VG', 'FoW', 'YGO']
    },
    name: {
        type: String,
        required: true,

    },
    image_url: {
        type: String,
        required: true,

    },
    card_type: {
        type: Number,
        required: true,
        min: 0,
    },
    color: {
        type: Number,
    },
    soul: Number,
    cost: Number,
    level: Number,
    power: {
        type: Number,
        min: -1,
    },
    text: String,
    traits: String,
    set_code: String,
    rarity: String,
    grade: Number,
    clan: String,
    triggers: [String],
    title_code: String,
});

export const Card = mongoose.model('Card', cardSchema);

