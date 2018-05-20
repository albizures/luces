global.__old_console_warn = global.__old_console_warn || console.warn
global.console.warn = str => {
  let tst = (str || '') + ''
  if (tst.startsWith('Warning: isMounted(...) is deprecated')) {
    return
  }
  return global.__old_console_warn.apply(console, [str])
}

import { AppRegistry } from 'react-native'
import App from './src'

AppRegistry.registerComponent('Luces', () => App)
