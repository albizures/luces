const isProd = process.env.NODE_ENV === 'production'
const express = require('express')
const port = 80

require('./config/connection')

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

  server.get('*', handle)

  server.listen(port, (err) => {
    if (err) throw err
    console.info(`> Ready on http://localhost:${port}`)
  })
})
