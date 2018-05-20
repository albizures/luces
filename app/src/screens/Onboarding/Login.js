import { Dimensions, Text, View, ImageBackground } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk'
import ButtonCTA from '../../components/ButtonCTA'

const { width, height } = Dimensions.get('window')
const potrait = height > width

class Login extends Component {
  fbAuth = () => {
    LoginManager.logInWithPermissions(['email', 'public_profile']).then(result => {
      if (result.isCancelled) {
        alert('Login cancelled')
      } else {
        alert('Login success:' + result.grantedPermissions)
      }
    }).catch(err => alert(err.message))
  }

  onLoginFinished = (error, result) => {
    if (error) {
      alert('login has error: ' + result.error)
    } else if (result.isCancelled) {
      alert('login is cancelled.')
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          alert(data.accessToken.toString())
        }
      )
    }
  }

  render () {
    return (
      <View style={[styles.container, { width, height }]}>
        <ImageBackground source={require('../../assets/photos/login.jpg')} style={styles.imageContainer} imageStyle={styles.imageBackground} />
        <View style={styles.textContainer}>
          <LoginButton
            publishPermissions={['publish_actions', 'email']}
            onLoginFinished={this.onLoginFinished}
            onLogoutFinished={() => alert('logout.')} />
          <ButtonCTA title='INGRESA CON FACEBOOK' onPress={this.props.navigation} />
          <Text style={styles.text}>Ingresar sin registrarme</Text>
        </View>
      </View>
    )
  }
}

Login.propTypes = {
  navigation: PropTypes.func
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
    marginTop: 26,
    textDecorationLine: 'underline'
  }
}

export default Login
