const cardService = require('../services/weiss_card.service');
const cardSchema = require('../models/weiss_card.schema');
const fs = require('fs');
const Joi = require('Joi');

async function script() {
    try {
        const madokaData = fs.readFileSync('../madoka.json');
        const data = JSON.parse(madokaData);
        const cardList = Joi.array().items(cardSchema.createCardSchmea);
        await cardList.validateAsync(data);

        data.forEach(c => {
            delete c.rarity;
        });

        await cardService.addManyService(data, 1, 2);
    } catch(err) {
        console.log(err);
    }
}

await script();