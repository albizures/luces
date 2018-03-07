require('dotenv').config()

module.exports = ['PORT', 'HOST'].reduce((env, key) => {
  return Object.assign(env, {
    ['process.env.' + key]: process.env[key]
  })
}, {})
