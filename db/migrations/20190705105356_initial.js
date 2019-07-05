
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('recipes', function(table) {
      table.increments('id').primary();
      table.string('foodType');
      table.string('recipeName');
      table.integer('calories');
      table.string('recipeUrl');
      table.integer('numIngredients');
      table.string('ingredientsString');

      table.timestamps(true, true);
    })
  ])

};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('recipes')
  ]);
};
