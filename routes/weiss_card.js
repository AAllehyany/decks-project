const weissCardService = require('../services/weiss_card.service')
const weissCardSchema = require('../models/weiss_card.schema');
const authMiddleware = require('./auth');
const Joi = require('joi');

module.exports = (express) => {

    const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            const result = await weissCardService.searchCardsService();
            return res.status(200).json(result);
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                message: 'error'
            });
        }
    })

    //TODO: Add passport authentication and restrict access
    router.post('/', authMiddleware.adminAuthMiddleware, async(req, res) => {
        try {
            const data = req.body;
            const cardList = Joi.array().items(weissCardSchema.createCardSchmea);
            await cardList.validateAsync(data);

            data.forEach(c => {
                delete c.rarity;
            });

            await weissCardService.addManyService(data, req.token.user_id, 2);
            res.sendStatus(200);

        } catch(err) {
            console.log(err)
            res.status(401).json({
                message: 'invalid input'
            })
        }
    })

    return router;
}