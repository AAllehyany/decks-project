
exports.up = function(knex) {
    return knex.schema.createTable('weiss_cards', function(table) {
        table.increments('id');
        table.string('name', 255).notNullable();
        table.string('traits', 255);
        table.integer('card_type');
        table.integer('color');
        table.integer('soul');
        table.integer('cost');
        table.integer('level');
        table.integer('power');
        table.text('text');
        table.integer('title_id').unsigned();
        table.integer('user_id').unsigned();
        table.foreign('title_id').references('weiss_titles.id');
        table.foreign('user_id').references('users.id');
        table.timestamps(false, true);
    })
};

exports.down = function(knex) {

    return knex.schema.dropTable('weiss_cards');
};
