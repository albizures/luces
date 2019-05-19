const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const isEmail = require('is-email-maybe')
const mail = require('@sendgrid/mail')
const dayjs = require('dayjs')

const { encryptPassword } = require('../../utils')
const downloadFile = require('../../utils/downloadFile')

const knex = require('../../config/connection')

const { SECRET_KEY, SENDGRID_KEY, HOST, PORT } = process.env

const baseUrl = PORT ? `http://${HOST}:${PORT}` : `http://${HOST}`

mail.setApiKey(SENDGRID_KEY)

const getFacebookFields = (token) => `https://graph.facebook.com/v2.8/me?fields=id,gender,name,email,picture&access_token=${token}`
const getFacebookPicture = (id) => `https://graph.facebook.com/${id}/picture?type=large`

async function getOrCreateUserByFacebook (response) {
  const { id: facebook_id } = response.data

  const [user] = await knex('users')
    .select({
      id_user: 'id_user',
      name: 'name'
    }).where({
      deleted: false,
      facebook_id
    })

  if (!user) {
    const { name, email, gender } = response.data
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

  const { id_user, name } = user

  return {
    id_user,
    name
  }
}

exports.signUp = asyncHandler(async (req, res) => {
  const { name, email, password: rawPassword } = req.body

  if (!isEmail(email)) {
    res.status(400)
    return res.json({
      message: 'Correo invalido',
      data: {
        email
      }
    })
  }

  const [user] = await knex('users')
    .select({
      id_user: 'id_user',
      name: 'name',
      facebookId: 'facebook_id',
      cover: 'cover'
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
      email: email.toLocaleLowerCase()
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

  const users = await knex('users')
    .select({
      email: 'email',
      password: 'password',
      id_user: 'id_user',
      name: 'name',
      admin: 'admin'
    }).where({
      email,
      deleted: false
    })

  if (users.length === 0) {
    res.status(400)
    return res.json({
      message: 'El correo y/o contraseña no son validos',
      data: {
        email
      }
    })
  }

  const [{ password: hash, id_user, name, admin }] = users

  const isEqual = await bcrypt.compare(password, hash)

  if (isEqual) {
    const user = { id_user, userId: id_user, name, admin }
    const token = jwt.sign(user, SECRET_KEY)
    res.json({ token, user })
  } else {
    res.status(401).json({ message: 'El correo y/o contraseña no son validos' })
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

const deleteTokens = async (userId) => {
  try {
    await knex('reset_password')
      .where({ id_user: userId })
      .update('deleted', true)
  } catch (error) {
    console.error(error)
  }
}

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  const users = await knex('users')
    .select({
      id_user: 'id_user',
      name: 'name'
    }).where({
      email,
      deleted: false
    })

  if (users.length === 0) {
    return res.json({ email })
  }

  const [{ id_user, name }] = users

  const token = await encryptPassword(Date.now().toString())

  await deleteTokens(id_user)

  await knex('reset_password')
    .insert({ token, id_user })

  const url = `lucesbeautiful://change-password/${encodeURIComponent(token)}`

  await mail.send({
    to: email,
    from: {
      name: 'Luces Beautiful App',
      email: 'app@lucesbeautiful.com'
    },
    subject: 'Reinicio de Contraseña',
    html: `
Hola ${name},
<br/>
<br/>
Recientemente solicitaste una recuperación de password para tu cuenta de Luces Beautiful. Haz click en el siguiente link para reiniciar tu contraseña.
<br/>
<br/>
<a href="${url}"
  href="${baseUrl}/redirect?url=${encodeURIComponent(url)}"
  href="${url}">
  ${url}
</a>
<br/>
<br/>
Si tú no fuiste quien pidió este reinicio de contraseña, por favor ignora este correo o escríbenos para déjanoslo saber. Este reinicio de contraseña es válido únicamente por los siguientes 30 minutos. 
<br/>
<br/>
Gracias por tu preferencia,<br/>
El equipo de Luces Beautiful.
`
  })

  res.json({ email })
})

exports.changePassword = asyncHandler(async (req, res) => {
  const { password: rawPassword, token } = req.body

  if (!rawPassword || !token) {
    return res.status(400).end()
  }

  const tokens = await knex('reset_password')
    .select({
      id_user: 'id_user',
      created_at: 'created_at'
    }).where({
      token,
      deleted: false
    })

  if (tokens.length < 0) {
    return res.status(400).end()
  }

  const [{ id_user, created_at }] = tokens
  const minutesOld = dayjs().diff(dayjs(created_at), 'minute')

  if (minutesOld > 30) {
    await deleteTokens(id_user)

    return res.status(400).end()
  }

  const password = await encryptPassword(rawPassword)

  await knex('users')
    .where({ id_user })
    .update('password', password)

  await deleteTokens(id_user)

  res.json({ id_user })
})
