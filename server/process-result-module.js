'use strict'

function process (result, ingredient) {
  result.reason = result.reason.replace('{term}', ingredient)
}

module.exports = process
