import { AppRegistry } from 'react-native'
import App from './src'
import backgroundMessaging from './src/utils/backgroundMessaging'

AppRegistry.registerComponent('Luces', () => App)
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => backgroundMessaging)
