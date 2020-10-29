exports.up = function(knex) {
    return knex.schema.createTable('weiss_titles', (table) => {
        table.increments('id');
        table.string('name').notNullable().unique();
        table.timestamps();
    })
};

exports.down = function(knex) {

    return knex.schema.dropTable('weiss_titles');
  
};