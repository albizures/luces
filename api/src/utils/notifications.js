const admin = require('firebase-admin')

/**
 * @param {object} data
 * @param {string} data.payload
 * @param {string} [data.topic='global']
 * @param {string} data.title
 * @param {string} data.body
 */
const sendNotification = async (data) => {
  const { payload, topic = 'global', title, body } = data
  const notification = {
    title,
    body
  }

  const message = {
    data: {
      payload: JSON.stringify(Object.assign(payload, { notification }))
    },
    topic,
    notification
  }

  try {
    const response = await admin.messaging().send(message)
    console.log('Successfully sent message:', response)
  } catch (error) {
    console.error('Error sending message:', error)
  }
}

const sendNewCourseNotification = async (course) => {
  const { id: courseId, name } = course

  await sendNotification({
    payload: JSON.stringify({ courseId }),
    title: 'Tenemos nuevo curso!',
    body: `${name} 🤓💁🏻‍💅🏻`,
    topic: 'course'
  })
}

module.exports = {
  sendNotification,
  sendNewCourseNotification
}
