const jwt = require('jsonwebtoken');


const adminAuthMiddleware = async (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).send('Bad request');

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        if(data.role !== 'admin') {
            return res.sendStatus(403);
        }
        req.token = data;
        next();
    } catch(err) {
        console.log(err);
        return res.sendStatus(403);
    }
}

module.exports = {
    adminAuthMiddleware,
}