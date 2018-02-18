import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

class Onboarding extends Component {
  goHome = () => {
    this.props.navigator.push({
      screen: 'Home',
      title: 'Home',
    });
  };

  render() {
    return (
      <View>
        <Onboarding
          onSkip={this.goHome}
          onDone={this.goHome}
          pages={[
            {
              backgroundColor: '#fff',
              image: <Image source={require('./assets/300x300.png')} />,
              title: 'Bienvenida',
              subtitle: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum',
            },
            {
              backgroundColor: '#fff',
              image: <Image source={require('./assets/300x300.png')} />,
              title: 'Aprende',
              subtitle: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum',
            },
            {
              backgroundColor: '#fff',
              image: <Image source={require('./assets/300x300.png')} />,
              title: 'Comparte',
              subtitle: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum',
            }
          ]}
        />
      </View>
    );
  }
}

export default {
  Component: Onboarding,
  screen: 'Onboarding',
  icon: require('../assets/icon2.png'),
  selectedIcon: require('../assets/icon2_selected.png'),
  title: 'Onboarding'
}