const admin = require('firebase-admin')

exports.sendNewCourseNotification = async (course) => {
  const notification = {
    title: 'Curso nuevo!!!',
    body: course.name
  }

  const data = Object.assign({}, course, { notification })

  const message = {
    data: {
      payload: JSON.stringify(data)
    },
    topic: 'new-course',
    notification
  }

  try {
    const response = await admin.messaging().send(message)
    console.log('Successfully sent message:', response)
  } catch (error) {
    console.log('Error sending message:', error)
  }
}
