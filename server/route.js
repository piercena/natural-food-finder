'use strict'

const ingredients = require('../data/ingredients.json')
const regexModule = require('./regular-expression-module')

module.exports = function route (app) {

  app.get('/', (req, res) => {
    res.render('index')
  })

  app.get('/search', (req, res) => {
    var ingredient = req.query.term
    var result = regexModule(ingredient)
    res.json({ result })
  })

  app.get('/ingredients', (req, res) => {
    res.json(ingredients)
  })

}
