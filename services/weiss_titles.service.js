const knex = require('../database');
const tableName = 'weiss_titles';

const getAllTitles = async () => (
    knex.select().table(tableName)
)

const createTitle = async (title) => {
    // title.created_at = Date.now();
    // title.updated_at = Date.now();

    return knex(tableName).insert(title)
}

const findByName = async (title) => (
    knex.select().table(tableName).whereRaw('LOWER(name) = ?', [title.toLowerCase()])
)

module.exports = {
    getAllTitles,
    createTitle,
    findByName
}