import { Navigation } from 'react-native-navigation';

import { getTabs } from './screens'

export default () => {
  getTabs
  Navigation.startTabBasedApp({
    tabs: getTabs()
  });
};