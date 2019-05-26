import 'dayjs/locale/es'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { PushNotificationIOS } from 'react-native'
import PushNotification from 'react-native-push-notification'

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister (token) {
    console.log('TOKEN:', token)
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification (notification) {
    console.log('NOTIFICATION:', notification)

    // process the notification

    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    notification.finish(PushNotificationIOS.FetchResult.NoData)
  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: 'YOUR GCM (OR FCM) SENDER ID',

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true,
})

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
