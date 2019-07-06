
exports.up = function(knex) {
  return Promise.all([
    knex.schema.table('recipes', function(table) {
      table.string('yield');
      table.integer('caloriesPerServing');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('recipes', function(table) {
      table.dropColumn('yield');
    })
  ])
};
