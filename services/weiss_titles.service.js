const knex = require('../database');
const tableName = 'weiss_titles';

const getAllTitles = async () => (
    knex.select().table(tableName)
)

module.exports = {
    getAllTitles,
}