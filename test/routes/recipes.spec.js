var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');
var knex = require('../../db/knex.js');


describe('Test the root path', () => {
  test('It should respond to the GET method', () => {
    return request(app).get("/").then(response => {
      expect(response.statusCode).toBe(200)
    })
  });
});


describe('GET /recipes', () => {
  it('should return all the recipes in the DB', async () => {

    const expectedRecipes = await knex('recipes').select()
    .then(recipes => {return recipes.length})

    const res = await request(app).get('/api/v1/recipes')
    const recipes = res.body.length


    expect(recipes).toEqual(expectedRecipes)
  })

  it('can return recipes sorted by a column name', async () => {

    const expectedRecipe = await knex('recipes').orderBy('calories')
    .then(recipes => {return recipes[0].recipeName})

    const res = await request(app).get('/api/v1/recipes?columnName=calories')
    const recipe = res.body[0].recipeName

    expect(recipe).toEqual(expectedRecipe)
  })

  it('should return all the recipes if column name is invalid', async () => {

    const expectedRecipes = await knex('recipes').select()
    .then(recipes => {return recipes.length})

    const res = await request(app).get('/api/v1/recipes?columnName=calorie')
    const recipes = res.body.length

    expect(recipes).toEqual(expectedRecipes)
  })
})

describe('GET /recipes/food_type', () => {
  it('can return recipes filtered by food type', async () => {

    const expectedRecipes = await knex('recipes').where('foodType', 'beef')
    .then(recipes => {return recipes.length})

    const res = await request(app).get('/api/v1/recipes/food_search?foodType=beef')
    const recipes = res.body.length


    expect(recipes).toEqual(expectedRecipes)
  })

  it('can return error message if given invalid filter', async () => {

    const expected = {error: 'No recipes with that food type!'}

    const res = await request(app).get('/api/v1/recipes/food_search?foodType=pasta')
    const recipes = res.body


    expect(recipes).toEqual(expected)
  })
})

describe('GET /recipes/ingredient_search', () => {
  it('can return recipes filtered and sorted by number of ingredients', async () => {

    const expectedRecipes = await knex('recipes')
    .whereBetween('numIngredients', [2, 4])
    .orderBy('numIngredients')
    .then(recipes => {return recipes.length})

    const res = await request(app).get('/api/v1/recipes/ingredient_search?from=2&to=4')
    const recipes = res.body.recipes.length


    expect(recipes).toEqual(expectedRecipes)
  })

  it('can return results if from and to are the same number', async () => {

    const expectedRecipes = await knex('recipes')
    .whereBetween('numIngredients', [3, 3])
    .orderBy('numIngredients')
    .then(recipes => {return recipes.length})

    const res = await request(app).get('/api/v1/recipes/ingredient_search?from=3&to=3')
    const recipes = res.body.recipes.length


    expect(recipes).toEqual(expectedRecipes)
  })
})

describe('GET /recipes/calorie_count', () => {
  it('can return recipes filtered and sorted by number of calories', async () => {

    const expectedRecipes = await knex('recipes')
    .whereBetween('caloriesPerServing', [300, 600])
    .orderBy('caloriesPerServing')
    .then(recipes => {return recipes.length})

    const res = await request(app).get('/api/v1/recipes/calorie_count?from=300&to=600')
    const recipes = res.body.recipes.length


    expect(recipes).toEqual(expectedRecipes)
  })

  it('can return an error message if no recipes in range', async () => {

    const expectedRecipes = 'No recipes within that calorie range!'

    const res = await request(app).get('/api/v1/recipes/calorie_count?from=200&to=300')
    const recipes = res.body


    expect(recipes).toEqual(expectedRecipes)
  })
})

describe('GET /recipes/average_calories', () => {
  it('can return recipes filtered and sorted by number of calories', async () => {

    const expectedRecipes = await knex.select('foodType')
    .from('recipes')
    .avg('caloriesPerServing as average_calories')
    .groupBy('foodType')
    .then(averages => {return averages})

    const res = await request(app).get('/api/v1/recipes/average_calories?q=foodType')
    const recipes = res.body


    expect(recipes).toEqual(expectedRecipes)
  })
})
