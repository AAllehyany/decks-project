import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('weiss_decks', t => {
        t.increments('id').primary();
        t.string('name').notNullable();
        t.string('code').notNullable().unique();
        t.timestamps(false, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('weiss_decks');
}

