const Promise = require('bluebird')
const path = require('path')
const fs = require('fs')
const request = require('request')
const crypto = require('crypto')

const pseudoRandomBytes = Promise.promisify(crypto.pseudoRandomBytes)

const download = (url, filename) => new Promise((resolve, reject) => {
  request.head(url, (err) => {
    if (err) reject(err)
    request(url).pipe(fs.createWriteStream(filename)).on('close', resolve)
  })
})

module.exports = async (url, ext) => {
  const raw = await pseudoRandomBytes(5)

  const name = raw.toString('hex') + Date.now() + (ext || path.extname(url))
  const filename = path.join('./uploads/', name)

  await download(url, filename)

  return path.join('uploads/', name)
}
