const assert = require('assert')
const knex = require('../config/connection')

const { assign } = Object

exports.getComments = async (config) => {
  const {
    user,
    course,
    commentsCount,
    comment
  } = config

  assert(!(comment && course), '`comment` and `course` can\'t both be false in the same query')

  const columns = {
    id: 'comments.id',
    user: 'users.id_user',
    comment: 'comments.comment',
    date: 'comments.created_at',
    userName: 'users.name',
    cover: 'users.cover',
    image: 'comments.image',
    itComments: 'comments.itComments'
  }

  if (user) {
    assign(columns, { liked: 'likes.id_user' })
  }

  let query = knex('comments')
    .select(columns)
    .select(knex.raw('IFNULL(likeCounter.likesCount, 0) as likes'))
    .leftJoin(
      knex('likes')
        .select({
          id_comment: 'likes.id_comment'
        })
        .count('likes.id_comment as likesCount')
        .where({
          'likes.deleted': false
        })
        .groupBy('likes.id_comment')
        .as('likeCounter'),
      'comments.id',
      '=',
      'likeCounter.id_comment',
      'LEFT'
    )

  if (commentsCount) {
    query = query
      .select(knex.raw('IFNULL(commentsCounter.commentsCount, 0) as comments'))
      .leftJoin(
        knex('comments')
          .select({
            id_comment: 'comments.itComments'
          })
          .count('comments.id as commentsCount')
          .groupBy('comments.id')
          .where({
            'comments.deleted': false
          })
          .as('commentsCounter'),
        'comments.id',
        '=',
        'commentsCounter.id_comment',
        'LEFT'
      )
  }

  if (user) {
    query = query.leftJoin(knex.raw(`likes as likes on likes.id_user = ${user} and comments.id = likes.id_comment and likes.deleted = 0`))
  }

  query = query.join('courses', 'comments.id_course', 'courses.id')
    .join('users', 'comments.id_user', 'users.id_user')
    .orderBy('comments.created_at', 'desc')
    .where({
      'users.deleted': false,
      'courses.deleted': false,
      'comments.deleted': false
    })

  if (comment) {
    query = query.where({ 'comments.itComments': comment })
  } else {
    query = query.whereNull('itComments')
  }

  if (course) {
    query.where({ 'courses.id': course })
  }

  const comments = await query

  return comments
}
