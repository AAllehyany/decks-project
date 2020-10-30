const knex = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tableName = 'users';

const generateAdminJWT = async () => {
    // const admin = await knex(tableName).whereRaw('LOWER(username) = ?', [user.toLowerCase()]).first;
    // if(admin === null) {
    //     return null;
    // }

    // const valid = await bcrypt.compare(password, admin);

    // if(!valid) {
    //     return null;
    // }

    const accessToken = jwt.sign({user_id: 1, role: 'admin'}, process.env.JWT_SECRET);

    return accessToken;
}

module.exports = {
    generateAdminJWT
}