require('./src/config/firebase')
const { sendNewCourseNotification } = require('./src/utils/notifications')

sendNewCourseNotification({
  id: 5,
  name: 'TEST - algo bueno 😊'
}).then(() => process.exit(0))
