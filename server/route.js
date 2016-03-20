'use strict'

const ingredients = require('../data/ingredients.json')
const regexModule = require('./regular-expression-module')
const processResultModule = require('./process-result-module')

module.exports = function route (app) {

  app.get('/', (req, res) => {
    res.render('index')
  })

  app.get('/search', (req, res) => {
    var ingredient = req.query.term
    var result = regexModule(ingredient.toLowerCase())
    if(result.result){
      processResultModule(result, ingredient)
    }
    res.json({ result })
  })

  app.get('/ingredients', (req, res) => {
    res.json(ingredients)
  })

}
