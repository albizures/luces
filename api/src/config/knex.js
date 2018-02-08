const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  client: 'mysql',
  debug,
  connection: {
    host: '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: 'luces'
  }
}
