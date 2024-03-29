const express = require('express')
const jwt = require('express-jwt')

const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 80

require('./config/connection')
require('./config/firebase')

const publicRoutes = ['_next', 'login', 'privacy-policy', 'redirect']

const isPublicRoute = (url) => publicRoutes.some(path => !url.includes(path))

const { handle, app } = require('./config/next')
const routes = require('./routes')

if (!isProd) {
  require('./utils/watcher')
}

app.then(() => {
  const server = express()

  require('./config/express')(server)

  if (isProd) {
    server.use('/api/', routes)
  } else {
    server.use('/api/', (req, res, next) => {
      require('./routes')(req, res, next)
    })
  }

  server.use(
    jwt({ secret: process.env.SECRET_KEY, credentialsRequired: false }),
    (req, res, next) => {
      if (isPublicRoute(req.url)) {
        return next()
      }

      if (req.user) {
        return next()
      }

      return res.redirect('/login')
    },
    (err, req, res, next) => {
      console.error(err)
      if (err.name === 'UnauthorizedError') {
        return res.redirect('/login')
      }
    }
  )

  server.use((req, res, next) => {
    if (
      (req.originalUrl.indexOf('/login') !== -1) ||
      (req.originalUrl.indexOf('/_next/') !== -1) ||
      (req.originalUrl.indexOf('/privacy-policy') !== -1) ||
      (req.originalUrl.indexOf('/redirect') !== -1)
    ) {
      return next()
    }
    if (req.user && req.user.admin) {
      return next()
    }

    return res.redirect('/login')
  })

  server.get('*', handle)

  server.listen(port, (err) => {
    if (err) throw err
    console.info(`> Ready on http://localhost:${port}`)
  })
})
