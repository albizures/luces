const next = require('next')
const path = require('path')
const withCSS = require('@zeit/next-css')

const dev = process.env.NODE_ENV !== 'production'
const app = next(withCSS({
  dev,
  dir: path.join(__dirname, '..')
}))

exports.app = app.prepare()
exports.handle = app.getRequestHandler()
