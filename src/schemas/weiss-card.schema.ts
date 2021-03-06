import Joi from 'joi';


/**
 * Represents a WeissCard entry to the database.
 */
export interface WeissCard {
    name: string,
    card_type: number,
    color: number,
    soul: number,
    cost: number,
    level: number,
    power: number,
    text: string,
    traits: string,
    set_code: string,
    game: string,
    triggers: Array<string>,
    title_code: string,
}

/**
 * Validations for inserting weiss card to DB.
 */
export const weissCardSchema = Joi.object({
    name: Joi.string().required(),
    card_type: Joi.number().min(0).max(2).required(),
    color: Joi.number().min(1).max(4).required(),
    soul: Joi.number().required().min(-1),
    cost: Joi.number().required().min(-1),
    level: Joi.number().required().min(-1),
    power: Joi.number().required().min(-1),
    text: Joi.string().default(''),
    traits: Joi.string().default('').allow(null, ''),
    set_code: Joi.string().default(''),
    game: Joi.string().required().valid('WS'),
    triggers: Joi.array().items(Joi.string()),
    title_code: Joi.string().required()
}).unknown(true);

export const searchQuerySchema = Joi.object({
    name: Joi.string(),
    card_type: Joi.number().min(0).max(2),
    color: Joi.number().min(1).max(4),
    soul: Joi.number().min(-1),
    min_cost: Joi.number().min(-1),
    max_cost: Joi.number().min(-1),
    min_level: Joi.number().min(-1),
    max_level: Joi.number().min(-1),
    min_power: Joi.number().min(-1),
    max_power: Joi.number().min(-1),
    text: Joi.string(),
    title_code: Joi.string()
});