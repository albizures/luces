const asyncHandler = require('express-async-handler')
const { sendNotification } = require('../../utils/notifications')

exports.sent = asyncHandler(async (req, res) => {
  const { body, title, courseId } = req.body
  await sendNotification({
    body,
    title,
    topic: courseId ? 'course' : 'global',
    payload: {
      courseId
    }
  })

  res.json(req.body)
})
