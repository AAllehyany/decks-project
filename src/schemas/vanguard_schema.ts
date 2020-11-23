import Joi from 'joi';


export interface VanguardCard {
    name: string 
    nation: string
    clan: string
    race: string
    card_type: number
    trigger: number
    power: number
    shield: number
    level: number
    text: string
    image_url: string
    imaginary_gift: number
}

export const vanugardSchema = Joi.object({
    name: Joi.string().required(),
})