import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { ImageBackground, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import colors from '../utils/colors'
import TopBar from '../components/TopBar'
import TabIcon from '../components/TabIcon'
import Course from '../components/Course'

export default class Favorites extends Component {
  static navigationOptions = {
    title: 'Favoritos',
    tabBarIcon: ({focused}) => {
      return <TabIcon
        activeSrc={require('../assets/tabs/favorites_active.png')}
        src={require('../assets/tabs/favorites.png')}
        focused={focused} />
    }
  }

  onRemove = () => {
    Alert.alert(
      'Quitar de Favoritos',
      'Estas a punto de quitar "Curso" de tus cursos Favoritos. Lo puedes volver a listar acá cuando quieras',
      [
        {text: 'No Quitar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Quitar', onPress: () => console.log('OK Pressed')}
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
      <LinearGradient colors={colors.blackGradientBackground} style={styles.container}>
        <TopBar
          icon={require('../assets/favorites.png')}
          text='Favoritos' />
        <ImageBackground source={require('../assets/logo.png')} style={styles.resultsContainer} imageStyle={styles.imageBackground}>
          <Course image={require('../assets/photos/learn.jpg')} title='Balayage' description='¡No necesitas un salón!' onRemove={this.onRemove} />
          <Course image={require('../assets/photos/login.jpg')} title='Balayage' description='¡No necesitas un salón!' onRemove={this.onRemove} />
          <Course image={require('../assets/photos/share.jpg')} title='Balayage' description='¡No necesitas un salón!' onRemove={this.onRemove} />
        </ImageBackground>
      </LinearGradient>
    )
  }
}

const styles = {
  imageBackground: {
    height: 100,
    width: 140,
    opacity: 0.16,
    top: '50%',
    left: '50%',
    marginTop: -50,
    marginLeft: -70
  },
  resultsContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 30
  },
  container: {
    backgroundColor: colors.black,
    flex: 1
  }
}
