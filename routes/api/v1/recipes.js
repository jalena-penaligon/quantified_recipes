var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex.js');

var roundAverages = function(food) {
  var roundedFood = {foodType: food.foodType, average_calories: Math.round(food.average_calories)}
  return roundedFood
}

router.get("/", function (req, res, next) {
  if (req.query.order == 'desc'){
    var sortOrder = 'desc'
  } else {
    var sortOrder = 'asc'
  }
  knex.schema.hasColumn('recipes', req.query.columnName)
    .then(validity => {
    if (validity == true){
      knex('recipes').orderBy(req.query.columnName, sortOrder)
      .then((recipes) => {
        res.status(200).json(recipes);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
    } else {
      knex('recipes').select()
      .then((recipes) => {
        res.status(200).json(recipes);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
    }
  })
})

router.get("/calorie_count", function (req, res, next) {
  knex('recipes').whereBetween('caloriesPerServing', [req.query.from, req.query.to])
    .then((recipes) => {
      if (recipes.length > 0) {
        res.status(200).json({results: recipes.length, recipes: recipes});
      } else {
        res.status(404).json("No recipes within that calorie range!");
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  })

router.get("/ingredient_search", function (req, res, next) {
  knex('recipes')
  .whereBetween('numIngredients', [req.query.from, req.query.to])
  .orderBy('numIngredients')
    .then((recipes) => {
      if (recipes.length > 0) {
        res.status(200).json({results: recipes.length, recipes: recipes});
      } else {
        res.status(404).json("No recipes within those ingredient counts!");
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  })

router.get("/food_search", function (req, res, next) {
  knex('recipes').where('foodType', req.query.foodType)
  .then((recipes) => {
    if (recipes.length > 0) {
      res.status(200).json(recipes);
    } else {
      res.status(404).json({error: "No recipes with that food type!"})
    }
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
})

router.get("/average_calories", function (req, res, next) {
  knex.select(req.query.q).from('recipes').avg('caloriesPerServing as average_calories').groupBy(req.query.q)
  .then(averages => {
    return Promise.all(averages.map(roundAverages))
  })
    .then(averages => {
      res.status(200).json(averages);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
})

module.exports = router;
