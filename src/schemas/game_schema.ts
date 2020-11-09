import {IGame} from '../models/game.model'
import Joi from 'joi';

export interface ICreateGameInput {
    title: IGame['title'],
    code: IGame['code']
}

export const createGameSchema = Joi.object({
    title: Joi.string().required(),
    code: Joi.string().required()
})