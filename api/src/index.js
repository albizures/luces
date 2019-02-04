const express = require('express')
const jwt = require('express-jwt')

const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 80

require('./config/connection')

const publicRoutes = ['_next', 'login', 'privacy-policy']

const isNotPublicRoute = (url) => publicRoutes.every(path => !url.includes(path))

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
      if (!req.user && isNotPublicRoute(req.url)) {
        return res.redirect('/login')
      }
      next()
    },
    (err, req, res, next) => {
      console.log(err)
      if (err.name === 'UnauthorizedError') {
        return res.redirect('/login')
      }
    }
  )

  server.use((req, res, next) => {
    if (
      (req.originalUrl.indexOf('/login') !== -1) ||
      (req.originalUrl.indexOf('/_next/') !== -1)
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
