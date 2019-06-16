import { displayNotification } from '../config'

export default async (message) => {
  // handle your message
  displayNotification(message)
  return Promise.resolve()
}
