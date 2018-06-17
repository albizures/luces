const asyncHandler = require('express-async-handler')
const Promise = require('bluebird')

const knex = require('../../config/connection')
const downloadFile = require('../../utils/downloadFile')

exports.get = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { id_user } = req.user
  const [course] = await knex('courses')
    .select({
      id: 'courses.id',
      name: 'courses.name',
      description: 'courses.description',
      image: 'courses.image_url',
      // idCategory: 'categories.id',
      // categoryName: 'categories.name',
      // icon: 'categories.icon',
      author: 'courses.author',
      // videos: knex.raw('COUNT(course_videos.id_course)'),
      favorite: 'favorites.id_course'
    })
    // .join('categories', 'courses.id_category', 'categories.id')
    // .leftJoin('course_videos', 'courses.id', 'course_videos.id_course')
    .leftJoin(
      knex.raw(`
        favorites as favorites
        on favorites.id_user = ${id_user}
          and courses.id = favorites.id_course 
          and favorites.deleted = 0`)
    )
    .where({
      'courses.deleted': false,
      'courses.id': id
      // 'course_videos.deleted': true
    })

  res.json(course)
})

exports.getAll = asyncHandler(async (req, res) => {
  const { id_user } = req.user
  const courses = await knex('courses')
    .select({
      id: 'courses.id',
      name: 'courses.name',
      description: 'courses.description',
      image: 'courses.image_url',
      idCategory: 'categories.id',
      categoryName: 'categories.name',
      icon: 'categories.icon',
      author: 'courses.author',
      videos: knex.raw('COUNT(course_videos.id_course)'),
      favorite: 'favorites.id_course'
    })
    .join('categories', 'courses.id_category', 'categories.id')
    .leftJoin('course_videos', 'courses.id', 'course_videos.id_course')
    .leftJoin(
      knex.raw(`
        favorites as favorites
        on favorites.id_user = ${id_user}
          and courses.id = favorites.id_course 
          and favorites.deleted = 0`)
    )
    .whereNot({
      'courses.deleted': true,
      'course_videos.deleted': true
    })
    .orderBy('courses.created_at', 'desc')
    .groupBy('courses.id')

  res.json(courses)
})

exports.getHighlights = asyncHandler(async (req, res) => {
  const { id_user } = req.user
  const courses = await knex('interests')
    .select({
      id: 'courses.id',
      name: 'courses.name',
      description: 'courses.description',
      image: 'courses.image_url',
      idCategory: 'categories.id',
      categoryName: 'categories.name',
      icon: 'categories.icon',
      author: 'courses.author',
      favorite: 'favorites.id_course'
    })
    .join('courses', 'courses.id_category', 'interests.id_category')
    .join('categories', 'categories.id', 'interests.id_category')
    .leftJoin(
      knex.raw(`
        favorites as favorites
        on favorites.id_user = ${id_user}
          and courses.id = favorites.id_course 
          and favorites.deleted = 0`)
    )
    .where({
      'interests.id_user': id_user,
      'courses.deleted': false,
      'interests.deleted': false,
      'categories.deleted': false
    })
    .orderBy('courses.created_at', 'desc')
  res.json(courses)
})

exports.getVideos = asyncHandler(async (req, res) => {
  const { id } = req.params
  const videos = await knex('course_videos')
    .select({
      id: 'videos.id',
      name: 'videos.name',
      youtubeId: 'videos.id_youtube',
      description: 'videos.description',
      url: 'videos.image_url',
      order: 'course_videos.order',
      author: 'videos.author'
    })
    .join('videos', 'course_videos.id_video', 'videos.id')
    .orderBy('course_videos.order', 'asc')
    .where({
      'course_videos.id_course': id,
      'course_videos.deleted': false
    })

  res.json(videos)
})

exports.getComments = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { id_user } = req.user

  const comments = await knex('comments')
    .select({
      id: 'comments.id',
      comment: 'comments.comment',
      date: 'comments.created_at',
      userName: 'users.name',
      cover: 'users.cover',
      liked: 'likes.id_user'
    })
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
    .leftJoin(knex.raw(`likes as likes on likes.id_user = ${id_user} and comments.id = likes.id_comment and likes.deleted = 0`))
    .join('courses', 'comments.id_course', 'courses.id')
    .join('users', 'comments.id_user', 'users.id_user')
    .orderBy('comments.created_at', 'desc')
    .where({
      'courses.id': id,
      'users.deleted': false,
      'courses.deleted': false,
      'comments.deleted': false
    })

  res.json(comments)
})

exports.postComment = asyncHandler(async (req, res) => {
  const { id: id_course } = req.params
  const { id_user } = req.user
  const { comment } = req.body

  const [id] = await knex('comments')
    .returning('id')
    .insert({
      id_course,
      id_user,
      comment
    })

  const [newComment] = await knex('comments')
    .select({
      id: 'comments.id',
      comment: 'comments.comment',
      date: 'comments.created_at',
      userName: 'users.name',
      cover: 'users.cover'
    })
    .join('users', 'users.id_user', 'comments.id_user')
    .where({
      'users.deleted': false,
      'comments.deleted': false,
      'comments.id': id
    })

  res.json(newComment)
})

const createVideo = (course, trx) => async (data) => {
  const { name, description, id: id_youtube, image, order, author } = data
  const { url, download } = image

  let image_url = url
  if (download) {
    image_url = await downloadFile(url)
  }

  console.log('createVideo', url, image_url, download)

  const [videoId] = await trx('videos')
    .returning('id')
    .insert({
      name,
      id_youtube,
      description,
      image_url,
      author
    })

  await trx('course_videos')
    .insert({
      id_video: videoId,
      id_course: course,
      order
    })
  return videoId
}

const beginTransaction = (body) => async (trx) => {
  const {
    name,
    category: id_category,
    description,
    image: image_url,
    author,
    videos
  } = body

  const [courseId] = await trx('courses')
    .returning('id')
    .insert({
      name,
      author,
      id_category,
      description,
      image_url
    })

  const videoCreator = createVideo(courseId, trx)

  await Promise.all(videos.map(videoCreator))
  return courseId
}

exports.post = asyncHandler(async (req, res) => {
  const result = await knex.transaction(beginTransaction(req.body))

  res.json({ id: result })
})

exports.put = asyncHandler(async (req, res) => {
  const { id } = req.params
  const {
    name,
    author,
    category: id_category,
    description,
    image: image_url
  } = req.body

  await knex('courses')
    .where({ id })
    .update({
      name,
      author,
      id_category,
      description,
      image_url
    })

  res.json({ id })
})

exports.putVideos = asyncHandler(async (req, res) => {
  const { id } = req.params
  const videos = req.body

  const videoCreator = createVideo(id, knex)

  const videoIds = await Promise.all(videos.map(videoCreator))

  res.json({ videos: videoIds })
})

exports.putVideosOrder = asyncHandler(async (req, res) => {
  const { id } = req.params
  const videos = req.body

  await Promise.all(videos.map(({idVideo, order}) => {
    return knex('course_videos')
      .where({
        id_video: idVideo,
        id_course: id
      })
      .update('order', order)
  }))

  res.json({ id })
})

exports.delete = asyncHandler(async (req, res) => {
  const { id } = req.params
  await knex('courses')
    .where({ id })
    .update('deleted', true)

  res.json({ id })
})

exports.deleteVideo = asyncHandler(async (req, res) => {
  const { id, videoId } = req.params
  await knex('course_videos')
    .where({
      id_video: videoId,
      id_course: id
    })
    .update('deleted', true)

  res.json({ id })
})

exports.search = asyncHandler(async (req, res) => {
  const { search } = req.params
  const courses = await knex('courses')
    .select({
      id: 'courses.id',
      name: 'courses.name',
      description: 'courses.description',
      image: 'courses.image_url',
      author: 'courses.author'
    })
    .join('categories', 'courses.id_category', 'categories.id')
    .where({
      'courses.deleted': false,
      'categories.deleted': false
    })
    .andWhere(function () {
      this
        .where('courses.name', 'like', `%${search}%`)
        .orWhere('courses.description', 'like', `%${search}%`)
        .orWhere('courses.author', 'like', `%${search}%`)
        .orWhere('categories.name', 'like', `%${search}%`)
    })
    .orderBy('courses.created_at', 'desc')

  res.json(courses)
})
