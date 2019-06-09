const admin = require('firebase-admin')

exports.sendNewCourseNotification = async (course) => {
  const { id: courseId, name } = course
  const notification = {
    title: 'Curso nuevo!!!',
    body: name
  }

  const data = Object.assign({ courseId }, { notification })

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
