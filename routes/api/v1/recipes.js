var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex.js');

router.get("/", function (req, res, next) {
  knex('recipes').select()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
})

module.exports = router;
