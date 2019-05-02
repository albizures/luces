const asyncHandler = require('express-async-handler')

const knex = require('../../config/connection')
const { getComments } = require('../../utils/queries')

exports.getComments = asyncHandler(async (req, res) => {
  const { id } = req.params
  let id_user

  if (req.user) {
    id_user = req.user.id_user
  }

  const comments = await getComments({
    user: id_user,
    comment: id
  })

  res.json(comments)
})

exports.postLike = asyncHandler(async (req, res) => {
  const { id: id_comment } = req.params
  const { id_user } = req.user
  await knex('likes')
    .insert({
      id_comment,
      id_user
    })

  const [likes] = await knex('likes')
    .select({
      id: 'likes.id_comment',
      likes: knex.raw('COUNT(likes.id_comment)')
    })
    .where({
      'likes.deleted': false,
      'likes.id_comment': id_comment
    })
    .groupBy('likes.id_comment')

  res.json(likes)
})

exports.deleteLike = asyncHandler(async (req, res) => {
  const { id: id_comment } = req.params
  const { id_user } = req.user
  await knex('likes')
    .where({
      id_comment,
      id_user
    })
    .update({
      deleted: true
    })

  const [likes] = await knex('likes')
    .select({
      id: 'likes.id_comment',
      likes: knex.raw('COUNT(likes.id_comment)')
    })
    .where({
      'likes.deleted': false,
      'likes.id_comment': id_comment
    })
    .groupBy('likes.id_comment')

  res.json(likes)
})

exports.deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { id_user } = req.user

  await knex('comments')
    .where({
      id,
      id_user
    })
    .update({
      deleted: true
    })

  res.json({
    id_comment: id,
    id_user
  })
})
