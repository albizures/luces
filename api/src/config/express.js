const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')

const uploadsPath = path.join(__dirname, '..', '..', 'uploads')

module.exports = (app) => {
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(morgan('tiny'))
  app.use('/uploads', express.static(uploadsPath))
  app.use((req, res, next) => {
    const token = req.cookies.id_token
    if (token) {
      req.headers.authorization = `Bearer ${token}`
    }
    next()
  })
}
