
exports.up = function(knex) {
 return knex.schema.createTable("knex_true_to_size", table => {
    table.increments();
    table.integer("shoe_id").notNullable();
    table.decimal('true_to_size').notNullable();
    table.decimal('actual_size').notNullable();
  });  
};

exports.down = function(knex) {
  return knex.schema.dropTable('knex_true_to_size');  
};
