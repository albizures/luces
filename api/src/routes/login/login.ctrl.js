const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const { encryptPassword } = require('../../utils')
const downloadFile = require('../../utils/downloadFile')

const knex = require('../../config/connection')

const { SECRET_KEY } = process.env

const getFacebookFields = (token) => `https://graph.facebook.com/v2.8/me?fields=id,gender,name,email,picture&access_token=${token}`
const getFacebookPicture = (id) => `https://graph.facebook.com/${id}/picture?type=large`

async function getOrCreateUserByFacebook (response) {
  const { name, email, gender, id: facebook_id } = response.data

  const [user] = await knex('users')
    .select({
      id_user: 'id_user',
      name: 'name'
    }).where({
      deleted: false,
      facebook_id
    })

  if (!user) {
    const cover = await downloadFile(getFacebookPicture(facebook_id), '.png')

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

exports.signUp = asyncHandler(async (req, res) => {
  const { name, email, password: rawPassword } = req.body
  const [user] = await knex('users')
    .select({
      id_user: 'id_user',
      name: 'name',
      facebookId: 'facebook_id'
    }).where({
      deleted: false,
      email
    })

  if (user) {
    const message = user.facebookId
      ? 'El correo que estas intentando usar ya esta registrado usando facebook'
      : 'El correo que estas intentando usar ya esta registrado'

    res.status(403)
    return res.json({
      message,
      data: {
        email
      }
    })
  }

  const password = await encryptPassword(rawPassword)
  const [id_user] = await knex('users')
    .returning('id_user')
    .insert({
      name,
      password,
      email
    })

  const token = jwt.sign({ id_user, name }, SECRET_KEY)
  res.json({ token, user })
})

exports.login = asyncHandler(async (req, res) => {
  const { token: fbToken } = req.body

  const response = await axios.get(getFacebookFields(fbToken))

  const user = await getOrCreateUserByFacebook(response)
  const token = jwt.sign(user, SECRET_KEY)

  res.json({ token, user })
})

exports.loginPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const [{password: hash, id_user, name}] = await knex('users')
    .select({
      email: 'email',
      password: 'password',
      id_user: 'id_user',
      name: 'name'
    }).where({
      email,
      deleted: false,
      admin: true
    })

  const isEqual = await bcrypt.compare(password, hash)

  if (isEqual) {
    const user = { id_user, name }
    const token = jwt.sign(user, SECRET_KEY)
    res.json({ token, user })
  } else {
    res.status(401).json({ message: 'error' })
  }
})

exports.getProfile = asyncHandler(async (req, res) => {
  const { id_user } = req.user
  const [user] = await knex('users')
    .select({
      email: 'email',
      id: 'id_user',
      name: 'name',
      cover: 'cover'
    }).where({
      id_user,
      deleted: false
    })

  res.json(user)
})
