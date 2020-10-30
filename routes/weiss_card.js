const weissCardService = require('../services/weiss_card.service')
const weissCardSchema = require('../models/weiss_card.schema');
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
    router.post('/', async(req, res) => {
        try {
            

        } catch(err) {
            console.log(err)
            res.status(401).json({
                message: 'invalid input'
            })
        }
    })

    return router;
}