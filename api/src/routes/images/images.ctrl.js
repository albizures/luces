const path = require('path')
const fs = require('fs')
const Promise = require('bluebird')
const asyncHandler = require('express-async-handler')

const stat = Promise.promisify(fs.stat)
const unlink = Promise.promisify(fs.unlink)

exports.upload = asyncHandler(async (req, res) => {
  const [image] = req.files
  res.json({
    url: image.path
  })
})

exports.delete = asyncHandler(async (req, res) => {
  const { url } = req.params

  const imagePath = path.join(process.cwd(), 'uploads', path.basename(url))
  const stats = await stat(imagePath)

  if (stats.isFile()) {
    await unlink(imagePath)
  }
  res.json({1: true})
})
