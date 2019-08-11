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
  firebase.messaging().subscribeToTopic('course')
  firebase.messaging().subscribeToTopic('global')

  const courseChannel = new firebase.notifications.Android
    .Channel('course', 'Nuevo Curso', firebase.notifications.Android.Importance.Max)
    .setDescription('Luces Beautiful - Nuevo Curso')

  const globalChannel = new firebase.notifications.Android
    .Channel('global', 'Luces Beautiful', firebase.notifications.Android.Importance.Max)
    .setDescription('Luces Beautiful')

  firebase.notifications().android.createChannel(courseChannel)
  firebase.notifications().android.createChannel(globalChannel)

  const notificationListener = firebase.notifications().onNotification((notification) => {
    if (!notification) {
      return
    }

    displayNotification(notification)
  })

  // If the app is in background
  const notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    if (!notificationOpen) {
      return
    }

    const { notification } = notificationOpen

    handler(notification)
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
    displayNotification(message)
  })

  return () => {
    notificationListener()
    notificationOpenedListener()
    messageListener()
  }
}

export const displayNotification = async (message) => {
  const { _messageId: messageId, _notificationId: notificationId, _data: data } = message
  const payload = JSON.parse(data.payload)

  const { notification: { title, body }, topic } = payload

  const notification = new firebase.notifications.Notification()
    .setNotificationId(messageId || notificationId)
    .setTitle(title)
    .setBody(body)
    .setData(data)
    .android.setAutoCancel(true)
    .android.setChannelId(topic)

  try {
    await firebase.notifications().displayNotification(notification)
  } catch (error) {
    console.error(error)
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
    await getToken()
  } catch (error) {
    // User has rejected permissions
    console.error('permission rejected')
  }
}

export async function checkPermission () {
  const enabled = await firebase.messaging().hasPermission()
  if (enabled) {
    await getToken()
  } else {
    await requestPermission()
  }
}
