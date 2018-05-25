const asyncHandler = require('express-async-handler')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const knex = require('../../config/connection')

const { SECRET_KEY } = process.env

const getFacebookFields = (token) => `https://graph.facebook.com/v2.8/me?fields=id,gender,name,email,cover&access_token=${token}`

async function getUser (response) {
  const { name, email, gender, cover } = response.data
  const facebook_id = response.data.id
  console.log(response.data, facebook_id, name, email, gender, cover)
  const [user] = await knex('users')
    .select({
      id_user: 'id_user',
      name: 'name'
    }).where({
      facebook_id
    })

  if (!user) {
    const [id_user] = await knex('users')
      .returning('id_user')
      .insert({
        name,
        facebook_id,
        gender,
        email,
        cover
      })
    return {
      id_user,
      name
    }
  }
  return user
}

exports.login = asyncHandler(async (req, res) => {
  const { token: fbToken } = req.body

  const response = await axios.get(getFacebookFields(fbToken))
  console.log('TODO: Download cover')

  const user = await getUser(response)
  const token = jwt.sign(user, SECRET_KEY)

  res.json({ token, user })
})
