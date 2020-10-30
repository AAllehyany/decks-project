import knexConfig from '../knexfile'
import knex from 'knex';

const connection = knexConfig['development'];
const db = knex(connection);


export default db;