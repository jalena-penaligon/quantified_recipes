# Project: Quantified Recipes

## Introduction:
This is the paired project from Mod 4 at Turing School of Software. Project is deployed at https://polar-basin-91086.herokuapp.com/. This application is a microservice for Quantified Self, available in production at https://lower-goose-93602.herokuapp.com/.

Github Projects board is available at https://github.com/Matt-Weiss/quantified-self/projects/1 in conjunction with the Quantified Self repository.

## Tech Stack
* Express 4.16.1
* Knex - PostgreSQL.
* JavaScript

## Initial Setup:
- Clone repository
- Run `npm install`
- `npx knex migrate:latest`
- `npx knex seed:run`
- `npm start`

### Known Issues:
Currently no CRUD functionality beyond GET. Post in the plans for the future.

### Running Tests:
 - `npm test`

### Core Contributors:
Matt Weiss - https://github.com/Matt-Weiss
Jalena Taylor - https://github.com/jalena-penaligon

### Schema Design:
Recipes table has the following columns:
- id
- foodType
- recipeName
- calories
- recipeUrl
- numIngredients
- ingredientsString
- yield
- caloriesPerServing
- createdAt
- updatedAt

### Endpoints
#### GET api/v1/recipes
Sample Response
Status: 200
[
  {
    "id": 1,
    "foodType": "chicken",
    "recipeName": "Citrus Roasted Chicken",
    "calories": 2643,
    "recipeUrl": "https://food52.com/recipes/3403-citrus-roasted-chicken",
    "numIngredients": 6,
    "ingredientsString": "1 chicken, about 3.5 to 4 pounds \n 1 lemon \n 1 blood orange \n 1 tangerine or clementine \n Kosher salt \n 1/2 cup chicken broth",
    "created_at": "2019-07-07T13:40:43.460Z",
    "updated_at": "2019-07-07T13:40:43.460Z",
    "yield": "4",
    "caloriesPerServing": 661
  },
  {
    "id": 2,
    "foodType": "chicken",
    "recipeName": "Roast Chicken",
    "calories": 2384,
    "recipeUrl": "http://www.epicurious.com/recipes/food/views/Roast-Chicken-394676",
    "numIngredients": 3,
    "ingredientsString": "1 tablespoon kosher salt \n 1 whole 4-pound chicken, giblets reserved for another use \n 1/4 cup (1/2 stick) unsalted butter, melted",
    "created_at": "2019-07-07T13:40:43.460Z",
    "updated_at": "2019-07-07T13:40:43.460Z",
    "yield": "4",
    "caloriesPerServing": 596
  }
]

#### GET api/v1/recipes/calorie_count?from='NUM'&to='NUM'
Sample Response
{
  "results": 2,
  "recipes": [
  {
    "id": 2,
    "foodType": "chicken",
    "recipeName": "Roast Chicken",
    "calories": 2384,
    "recipeUrl": "http://www.epicurious.com/recipes/food/views/Roast-Chicken-394676",
    "numIngredients": 3,
    "ingredientsString": "1 tablespoon kosher salt \n 1 whole 4-pound chicken, giblets reserved for another use \n 1/4 cup (1/2 stick) unsalted butter, melted",
    "created_at": "2019-07-07T13:40:43.460Z",
    "updated_at": "2019-07-07T13:40:43.460Z",
    "yield": "4",
    "caloriesPerServing": 596
  },
  {
    "id": 10,
    "foodType": "chicken",
    "recipeName": "Chicken & Peppers",
    "calories": 1197,
    "recipeUrl": "http://thestonesoup.com/blog/2012/05/the-1-thing-you-should-never-do-when-combining-flavours/",
    "numIngredients": 2,
    "ingredientsString": "4-6 chicken drumsticks /n 2-3 large red capsicum (bell peppers), chopped",
    "created_at": "2019-07-07T13:40:43.460Z",
    "updated_at": "2019-07-07T13:40:43.460Z",
    "yield": "2",
    "caloriesPerServing": 599
  }
]
}

#### GET api/v1/recipes/ingredient_search?from='NUM'&to='NUM'
{
  "results": 3,
  "recipes": [
    {
      "id": 6,
      "foodType": "chicken",
      "recipeName": "Baked Enchilada Chicken",
      "calories": 3604,
      "recipeUrl": "http://www.kitchendaily.com/recipe/baked-enchilada-chicken",
      "numIngredients": 2,
      "ingredientsString": "3 ½ lb chicken parts /n 1 cup prepared enchilada sauce",
      "created_at": "2019-07-07T13:40:43.460Z",
      "updated_at": "2019-07-07T13:40:43.460Z",
      "yield": "6",
      "caloriesPerServing": 601
    } ...

#### GET api/v1/recipes/food_search?foodType='FOOD'

[
  {
    "id": 1,
    "foodType": "chicken",
    "recipeName": "Citrus Roasted Chicken",
    "calories": 2643,
    "recipeUrl": "https://food52.com/recipes/3403-citrus-roasted-chicken",
    "numIngredients": 6,
    "ingredientsString": "1 chicken, about 3.5 to 4 pounds \n 1 lemon \n 1 blood orange \n 1 tangerine or clementine \n Kosher salt \n 1/2 cup chicken broth",
    "created_at": "2019-07-07T13:40:43.460Z",
    "updated_at": "2019-07-07T13:40:43.460Z",
    "yield": "4",
    "caloriesPerServing": 661
  }...
]

#### GET api/v1/recipes/average_calories?q=foodType
[
  {
    "foodType": "chicken",
    "average_calories": 645
  },
  {
    "foodType": "beef",
    "average_calories": 654
  },
  {
    "foodType": "pork",
    "average_calories": 640
  }
]
