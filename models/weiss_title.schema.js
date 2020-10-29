const Joi = require('joi');


const createTitleSchmea = Joi.object({
    name: Joi.string().required(),
});


module.exports = {
    createTitleSchmea,
}