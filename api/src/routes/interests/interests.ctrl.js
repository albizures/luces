const asyncHandler = require('express-async-handler')

const knex = require('../../config/connection')

exports.getAllUserInterests = asyncHandler(async (req, res) => {
  const { id_user } = req.user

  const categories = await knex('interests')
    .select({
      category: 'categories.id'
    })
    .join('categories', 'interests.id_category', 'categories.id')
    .join('users', 'interests.id_user', 'users.id_user')
    .where({
      'users.id_user': id_user,
      'interests.deleted': false,
      'categories.deleted': false,
      'users.deleted': false
    })

  res.json(categories)
})

exports.post = asyncHandler(async (req, res) => {
  const { categories } = req.body
  const { id_user } = req.user

  const promises = categories.map(async category => {
    const interest = await knex('interests').select({
      category: 'interests.id_category'
    })
      .join('users', 'interests.id_user', 'users.id_user')
      .where({
        'users.id_user': id_user,
        'interests.deleted': false
      })
    if (interest.length === 0) {
      return knex('interests').insert({
        id_category: category,
        id_user: id_user
      })
    }
  })

  await Promise.all(promises)

  res.json({ categories })
})

exports.put = asyncHandler(async (req, res) => {
  const categories = req.body
  const { id_user } = req.user

  const interestsList = await knex('interests')
    .select({
      id_category: 'id_category'
    })
    .where({
      id_user,
      deleted: false
    })
  const interests = interestsList.map(interest => interest.id_category)

  categories.map(async ({id_category, add}) => {
    if (add) {
      if (!interests.includes(id_category)) {
        await knex('interests').insert({
          id_category,
          id_user
        })
      }
    } else {
      if (interests.includes(id_category)) {
        await knex('interests')
          .where({
            id_category,
            id_user
          })
          .update('deleted', true)
      }
    }
  })

  res.json(categories)
})
