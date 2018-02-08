const next = require('next')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev,
  dir: path.join(__dirname, '..')
})

exports.app = app.prepare()
exports.handle = app.getRequestHandler()
