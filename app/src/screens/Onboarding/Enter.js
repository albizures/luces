import { Dimensions, View, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { withUser } from '../../components/UserContext'
import ButtonCTA from '../../components/ButtonCTA'

const { width, height } = Dimensions.get('window')
const potrait = height > width

class Enter extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    loading: false,
  }

  onEnter = async () => {
    const { navigation } = this.props

    await AsyncStorage.setItem('onboarding', 'seen')

    navigation.navigate('Home')
  }

  render () {
    return (
      <View style={[styles.container, { width, height }]}>
        <ImageBackground source={require('../../assets/photos/login.jpg')} style={styles.imageContainer} imageStyle={styles.imageBackground} />
        <View style={styles.textContainer}>
          <ButtonCTA title='INGRESA AHORA' onPress={this.onEnter} />
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: potrait ? 'center' : 'flex-start',
    paddingTop: potrait ? 0 : 10,
    backgroundColor: '#252525',
  },
  imageContainer: {
    paddingBottom: potrait ? 30 : 10,
    width: '100%',
    flex: 9,
    alignContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 6,
    marginTop: 46,
    paddingHorizontal: 28,
    alignItems: 'center',
    width: '100%',
  },
  imageBackground: {
    resizeMode: 'cover',
  },
}

export default withUser(Enter)
