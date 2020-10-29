const knex = require('../database')
const tableName = 'users';

const createUser = async (userModel) => {
    delete userModel.repeat_password;
    return knex(tableName).insert(userModel, ['id']); 
};

const getUsers = async () => {
    return knex.select().table(tableName);
};

const getByEmail = async (email) => {
    return knex(tableName).whereRaw('LOWER(email) = ?', [email.toLowerCase()]);
}

const getByUsername = async (username) => {
    return knex(tableName).whereRaw('LOWER(username) = ?', [username.toLowerCase()]);
}


module.exports = {
    createUser,
    getUsers,
    getByEmail,
    getByUsername
}