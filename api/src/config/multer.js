const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Tiene que ser una imagen'))
    }
    cb(null, true)
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(5, (err, raw) => {
      if (err) {
        return cb(err)
      }
      cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname))
    })
  }
})
