const router = require('express').Router()
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')

const controller = require('./images.ctrl')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(5, (err, raw) => {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname))
    })
  }
})

const upload = multer({ storage })

router.post('/', upload.any(), controller.upload)
router.delete('/:url', controller.delete)

module.exports = router
