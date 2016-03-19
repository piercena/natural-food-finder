'use strict'

const path = require('path')
const express = require('express')
const app = express()
const route = require('./route')

let assetsMiddleware = express.static(path.resolve(__dirname, '../bundle'))
app.use('/assets', assetsMiddleware)
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '../client/views'))

route(app)

app.listen(8090, (err) => {
  if (err) { throw err }

  console.log('Listening... http://localhost:8090')
})
