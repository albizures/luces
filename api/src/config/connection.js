const config = require('./knex')
const knex = require('knex')(config)

module.exports = knex
