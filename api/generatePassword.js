require('dotenv').config()
var bcrypt = require('bcrypt')

bcrypt.hash(
  process.argv[2],
  Number(process.env.SALT_ROUNDS)
)
  .then(console.log)
  .catch(console.error)
