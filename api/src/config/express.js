const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')

const uploadsPath = path.join(__dirname, '..', '..', 'uploads')

console.log(uploadsPath)

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(morgan('tiny'))
  app.use('/uploads', express.static(uploadsPath))
}
