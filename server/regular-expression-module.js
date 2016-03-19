'use strict'

const ingredients = require('../data/ingredients.json').ingredients
const _ = require('lodash')

function ingredientIsASugar(str){
  var endsWithOSE = /ose$/
  var dext = /dext/
  var startsWithGLU = /\bglu/
  var sacch = /sacch/
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
  var endsWithITOL = /itol$/
  var startsWithGLY = /\bgly/
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
  var sacch = /sacch/
  var isASaccharide = "this is a saccharide, a binding of two types of sugar."

  if(str.match(sacch)){
    return { result: true, reason: str + " contains 'sacch' which means " + isASaccharide}
  }

  return { result: false}
}

function checkForIngredientListWords(str){
  var ingredientRegex;
  var result = {}
  _.forEach(ingredients, (value, key) => {
    ingredientRegex = new RegExp(value);
    if(str.match(ingredientRegex)){
      result = { result: true, reason: "This is on the list of non-compliant foods and ingredients" }
    }
  })
  if(result && result.result){
    return result;
  }
  return { result: false}
}


function checkForKeywords (str) {
  var isSugarType = ingredientIsASugar(str)
  if(isSugarType.result){
    return isSugarType;
  }
  var isSugarAlcoholType = ingredientIsASugarAlcohol(str)
  if(isSugarAlcoholType.result){
    return isSugarAlcoholType
  }
  var isASaccharide = ingredientIsASaccharide(str)
  if(isASaccharide.result){
    return isASaccharide
  }
  var containsWordFromIngredientList = checkForIngredientListWords(str)
  if(containsWordFromIngredientList.result){
    return containsWordFromIngredientList
  }

  return { result: false}
}

module.exports = checkForKeywords
