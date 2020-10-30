import Joi from 'joi';

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