import Joi from 'joi';

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
    game: Joi.string().required().valid('WS')
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
});