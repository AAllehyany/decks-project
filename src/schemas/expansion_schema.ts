import {IExpansion} from '../models/expansion.model'
import Joi from 'joi';

export interface ICreateExpansionInput {
    name: IExpansion['name'],
    title_codes: IExpansion['title_codes']
}

export const createExpansionSchema = Joi.object({
    name: Joi.string().required(),
    title_codes: Joi.array().required().items(Joi.string())
})