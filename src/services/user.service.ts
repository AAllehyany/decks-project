import knex from 'knex';
const tableName = 'users';

export const createUser = async (db: knex, model: any) => {
    delete model.repeat_password;
    return db(tableName).insert(model, ['id']); 
};

export const getUsers = async (db: knex) => {
    return db.select().table(tableName);
};

export const getByEmail = async (db: knex, email: string ) => {
    return db(tableName).whereRaw('LOWER(email) = ?', [email.toLowerCase()]);
}

export const getByUsername = async (db: knex, username: string) => {
    return db(tableName).whereRaw('LOWER(username) = ?', [username.toLowerCase()]);
}