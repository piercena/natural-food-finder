var express = require('express')
var app = express()
var dust = require('dustjs-linkedin')
var expressDust = require('express-dustjs')(dust)
var path = require('path')
var ingredients = require('./ingredients.json')

app.engine('dust', expressDust.engine({ useHelpers: true}))
app.set('view engine', 'dust')
app.set('views', path.resolve(__dirname, './client'))

app.get("/", function(req, res){
  res.render("index")
})

app.get("/search", function(req, res){
  var ingredient = req.query.ingredientSearch
  res.json({ result: ingredients.ingredients.indexOf(ingredient) > -1})
})

app.listen(8090)
