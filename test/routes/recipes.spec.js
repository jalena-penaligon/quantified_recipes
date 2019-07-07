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
    // setup
    const expectedRecipes = await knex('recipes').select()
    .then(recipes => {return recipes.length})
    // execution
    const res = await request(app).get('/api/v1/recipes')
    const recipes = res.body.length

    // expectation
    expect(recipes).toEqual(expectedRecipes)
  })
})
