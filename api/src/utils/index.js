const bcrypt = require('bcrypt')

exports.encryptPassword = (password) => {
  return bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS)
  )
}
