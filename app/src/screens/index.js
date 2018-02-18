import { Navigation } from 'react-native-navigation';

import Onboarding from './Onboarding';
import Home from './Home';

const screens = [
  Onboarding,
  Home
]

export const getTabs = () => screens.reduce((tabs, screen) => {
  Navigation.registerComponent(screen.screen, () => screen.Component);
  return tabs.concat([screen])
}, []);