const weissTitleService = require('../services/weiss_titles.service')

module.exports = (express) => {

    const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            const result = await weissTitleService.getAllTitles();
            return res.status(200).json(result);
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                message: 'error'
            });
        }
    })

    return router;
}