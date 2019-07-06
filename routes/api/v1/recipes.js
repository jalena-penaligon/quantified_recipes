var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex.js');

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

module.exports = router;
