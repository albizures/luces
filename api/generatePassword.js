require('dotenv').config()
const { encryptPassword } = require('./src/utils')

encryptPassword(process.argv[2])
  .then(console.log)
  .catch(console.error)
