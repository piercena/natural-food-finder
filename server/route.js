'use strict'

const ingredients = require('../data/ingredients.json')

module.exports = function route (app) {

  app.get('/', (req, res) => {
    res.render('index')
  })

  app.get('/search', (req, res) => {
    var ingredient = req.query.term
    res.json({ result: ingredients.ingredients.indexOf(ingredient) > -1})
  })

  app.get('/ingredients', (req, res) => {
    res.json(ingredients)
  })

}
