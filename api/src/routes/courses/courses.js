const router = require('express').Router()
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname))
    })
  }
})

const controller = require('./courses.ctrl')

const upload = multer({ storage })

router.get('/', controller.getAll)

router.post('/', controller.post)

router.put('/:id', controller.put)

router.delete('/:id', controller.delete)

router.post('/image', upload.any(), controller.upload)

module.exports = router
