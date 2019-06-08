import 'dayjs/locale/es'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'

dayjs.locale('es', {
  relativeTime: {
    future: 'en %s',
    past: '%s',
    s: '< 0s',
    ss: '%ss',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1M',
    MM: '%dM',
    y: '1a',
    yy: '%da',
  },
})

dayjs.extend(relativeTime)

export function createNotificationListeners (handler) {
  firebase.messaging().subscribeToTopic('new-course')

  // Triggered when a particular notification has been received in foreground
  const notificationListener = firebase.notifications().onNotification((notification) => {
    if (!notification) {
      return
    }
    handler(notification)
  })

  // If the app is in background
  const notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    if (!notificationOpen) {
      return
    }

    handler(notificationOpen.notification)
  })

  // If the app is closed
  firebase
    .notifications()
    .getInitialNotification()
    .then((notificationOpen) => {
      if (!notificationOpen) {
        return
      }
      handler(notificationOpen.notification)
    })

  /*
  * Triggered for data only payload in foreground
  * */
  const messageListener = firebase.messaging().onMessage((message) => {
    // process data message
    const { _messageId: id, _data: data } = message
    const payload = JSON.parse(data.payload)

    const { notification: { title, body } } = payload
    console.log(message)

    const notification = new firebase.notifications.Notification()
      .setNotificationId(id)
      .setTitle(title)
      .setBody(body)
      .setData(payload)

    firebase.notifications().displayNotification(notification)
  })

  return () => {
    notificationListener()
    notificationOpenedListener()
    messageListener()
  }
}

async function getToken () {
  let fcmToken = await AsyncStorage.getItem('fcmToken')
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken()
    if (fcmToken) {
      // user has a device token
      await AsyncStorage.setItem('fcmToken', fcmToken)
    }
  }
}

async function requestPermission () {
  try {
    await firebase.messaging().requestPermission()
    // User has authorised
    getToken()
  } catch (error) {
    // User has rejected permissions
    console.log('permission rejected')
  }
}

export async function checkPermission () {
  const enabled = await firebase.messaging().hasPermission()
  if (enabled) {
    getToken()
  } else {
    requestPermission()
  }
}
