import { Dimensions, Text, View, ImageBackground } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { LoginManager, AccessToken } from 'react-native-fbsdk'

import { withUser } from '../../components/UserContext'
import ButtonCTA from '../../components/ButtonCTA'
import http, { instance } from '../../utils/http'

const { width, height } = Dimensions.get('window')
const potrait = height > width

const permissions = ['email', 'public_profile']

class Login extends Component {
  static propTypes = {
    changeUser: PropTypes.func.isRequired,
    navigation: PropTypes.func.isRequired,
    setLoaderStatus: PropTypes.func.isRequired
  }

  state = {
    loading: false
  }

  fbAuth = async () => {
    this.props.setLoaderStatus(true)
    try {
      const { isCancelled } = await LoginManager.logInWithReadPermissions(permissions)
      if (isCancelled) {
        throw new Error('Login cancelled')
      }
      const { accessToken } = await AccessToken.getCurrentAccessToken()

      const { data: { token, user } } = await http.login(accessToken.toString())

      instance.defaults.headers.common['Authorization'] = 'Bearer ' + token

      const { data: interests } = await http.get('interests/user')
      this.props.changeUser({
        ...user,
        interests: Array.isArray(interests) && interests.length > 0,
        token
      })

      this.props.navigation()
    } catch (error) {
      this.props.setLoaderStatus(false)
      alert(error.message)
    }
  }

  render () {
    return (
      <View style={[styles.container, { width, height }]}>
        <ImageBackground source={require('../../assets/photos/login.jpg')} style={styles.imageContainer} imageStyle={styles.imageBackground} />
        <View style={styles.textContainer}>
          <ButtonCTA title='INGRESA CON FACEBOOK' onPress={this.fbAuth} />
          {/* <ButtonCTA title='INGRESA CON FACEBOOK' onPress={this.props.navigation} /> */}
          <Text style={styles.text}>Ingresar sin registrarme</Text>
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
    backgroundColor: '#252525'
  },
  imageContainer: {
    paddingBottom: potrait ? 60 : 10,
    width: '100%',
    flex: 14,
    alignContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 6,
    marginTop: 46,
    paddingHorizontal: 28,
    alignItems: 'center',
    width: '100%'
  },
  imageBackground: {
    resizeMode: 'cover'
  },
  padding: {
    paddingHorizontal: 20
  },
  text: {
    color: '#b98a56',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 20,
    textDecorationLine: 'underline'
  }
}

export default withUser(Login)
