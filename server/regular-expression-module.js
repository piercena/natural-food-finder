'use strict'

const ingredients = require('../data/ingredients.json').ingredients
const foods = require("../data/food-groups.json").groups
const _ = require('lodash')

function ingredientIsASugar(str){
  var endsWithOSE = /ose\s?/i
  var dext = /dext/i
  var startsWithGLU = /\bglu/i
  var sacch = /sacch/i
  var isASugar = "this is a type of sugar."

  if(str.match(endsWithOSE)){
    return { result: true, reason: str + " ends with 'ose' which means " + isASugar}
  }

  if(str.match(dext)){
    return { result: true, reason: str + " contains 'dext' which means " + isASugar}
  }

  if(str.match(startsWithGLU)){
    return { result: true, reason: str + " begins with 'glu' which means " +isASugar}
  }

  var isSaccharide = ingredientIsASaccharide(str)
  if(isSaccharide.result){
    return isSaccharide
  }

  return { result: false}
}

function ingredientIsASugarAlcohol(str){
  var endsWithITOL = /itol$/i
  var startsWithGLY = /\bgly/i
  var isASugarAlcohol = "this is a sugar alcohol"

  if(str.match(endsWithITOL)){
    return { result: true, reason: str + " ends with 'itol' which means " + isASugarAlcohol}
  }

  if(str.match(startsWithGLY)){
    return { result: true, reason: str + " begins with 'gly' which means " + isASugarAlcohol}
  }

  return { result: false}
}

function ingredientIsASaccharide(str){
  var sacch = /sacch/i
  var isASaccharide = "this is a saccharide, a binding of two types of sugar."

  if(str.match(sacch)){
    return { result: true, reason: str + " contains 'sacch' which means " + isASaccharide}
  }

  return { result: false}
}

function checkForIngredientListWords(str){
  var ingredientRegex
  var result = {}

  _.forEach(ingredients, (value, key) => {
    ingredientRegex = new RegExp(value, "i")
    if(str.match(ingredientRegex)){
      result = { result: true, reason: "This is on the list of non-compliant foods and ingredients" }
    }
  })
  if(result && result.result){
    return result;
  }
  return { result: false}
}

function checkForFoodListWords(str, children){
  var result = {}
  var foodRegex
  _.forEach(children, (value, key) => {
    foodRegex = new RegExp(value.name, "i")

    if(str.match(foodRegex)){
      result = value
      return
    }
  })
  return result
}

function checkForKeywords (str) {
  var result = {}

  result = ingredientIsASugar(str)
  if(result.result){
    return result
  }
  result = ingredientIsASugarAlcohol(str)
  if(result.result){
    return result
  }
  result = ingredientIsASaccharide(str)
  if(result.result){
    return result
  }
  result = checkForIngredientListWords(str)
  if(result.result){
    return result
  }
  _.forEach(foods, (value, key) => {
    if(result.name){
      return
    }
    result = checkForFoodListWords(str, value.children)
  })
  
  return result
}

module.exports = checkForKeywords
