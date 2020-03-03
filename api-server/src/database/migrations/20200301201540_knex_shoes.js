
exports.up = function(knex) {
 return knex.schema.createTable('knex_shoes', function(table){
    table.increments();
    table.string('name').notNullable().unique();
    table.decimal('true_to_size_avg').notNullable();
    table.integer('count').notNullable();
 })
};

exports.down = function(knex) {
 return knex.schema.dropTable('knex_shoes');  
};
