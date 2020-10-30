const bcrypt = require('bcrypt');
const userService = require('../services/user.service');
const authService = require('../services/authentication.service');
const userSchema = require('../models/user.schema');

const setUpRoutes = (express) => {
    const router = express.Router();

    router.post('/', async (req, res) => {
        const data = req.body;
        try {
            
            await userSchema.createUserSchema.validateAsync(data);
            const checkEmail = await userService.getByEmail(data.email);
            const checkUsername = await userService.getByUsername(data.username);

            if(checkEmail.length > 0) {
                return res.status(401).json({
                    message: 'email already used'
                });
            }

            if(checkUsername.length > 0) {
                return res.status(401).json({
                    message: 'Username already used'
                });
            }

            const hash = await bcrypt.hash(data.password, 5);
            data.password = hash;

            await userService.createUser(data);
            return res.status(200).json({
                message: 'hi you signed up, Ithink'
            });
            
        } catch(err) {
            console.log(err);
            return res.status(401).json({
                message: 'Bad request??'
            });
        }
    });

    router.post('/auth', async (req, res) => {
        const data = req.body;
        try {
            
            await userSchema.authUserSchema.validateAsync(data);
            const checkUsername = await userService.getByUsername(data.username);

            if(checkUsername.length == 0) {
                return res.status(403).json({
                    message: 'invalid credentials'
                });
            }

            const valid = await bcrypt.compare(data.password, checkUsername[0].password);
            if(!valid) {
                return res.status(403).json({
                    'message': 'forbidden'
                });
            }

            const accessToken = await authService.generateAdminJWT();
            return res.status(200).json({
                accessToken
            });
            
        } catch(err) {
            console.log(err);
            return res.status(401).json({
                message: 'Bad request??'
            });
        }
    });

    router.get('/', async (req, res) => {
        try {
            const response = await userService.getUsers();

            return res.status(200).json(response);
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                message: "???"
            })
        }
    });


    return router;
}

module.exports = setUpRoutes;