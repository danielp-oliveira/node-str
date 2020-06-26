'use strict'

require('dotenv/config')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

// Conecta ao banco
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`)
  process.exit(1)
})

// Carrega os Models
require('./models/product')
require('./models/customer')
require('./models/order')

// Carrega as Rotas
const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')
const customerRoute = require('./routes/customer-route')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoute)
app.use('/products', productRoute)
app.use('/customers', customerRoute)

module.exports = app
