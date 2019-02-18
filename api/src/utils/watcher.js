const chokidar = require('chokidar')

const watchRegex = /\/src\/(routes|utils)/
const ignoreRegex = /(node_modules|watcher\.js)/
const watcher = chokidar.watch('./src/(routes|utils)/**/*.js', { ignored: ignoreRegex })

watcher.on('ready', () => {
  watcher.on('all', (event, filePath) => {
    console.info('> Reloading server...')
    Object.keys(require.cache).forEach(name => {
      if (watchRegex.test(name) && !ignoreRegex.test(name)) {
        delete require.cache[name]
        // require(name)
      }
    })
  })
})
