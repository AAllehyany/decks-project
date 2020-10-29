const weissTitleService = require('../services/weiss_titles.service')
const weissTitleSchema = require('../models/weiss_title.schema');
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

    //TODO: Add passport authentication and restrict access
    router.post('/', async(req, res) => {
        try {
            const body = req.body;
            
            await weissTitleSchema.createTitleSchmea.validateAsync(body);

            const unique = await weissTitleService.findByName(body.name);
            
            if(unique.length > 0) {
                return res.status(401).json({
                    message: 'ttile exists'
                })
            }

            await weissTitleService.createTitle(body);
            res.status(200).json({
                message: 'title created successfully',
            })

        } catch(err) {
            console.log(err)
            res.status(401).json({
                message: 'invalid input'
            })
        }
    })

    return router;
}