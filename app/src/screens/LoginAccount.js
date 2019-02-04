import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Image, StyleSheet } from 'react-native'

import { withUser } from '../components/UserContext'
import ButtonCTA from '../components/ButtonCTA'
import Container from '../components/Container'
import TextInput from '../components/TextInput'

import http from '../utils/http'

class LoginAccount extends Component {
  static propTypes = {
    changeUser: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  onChange = (evt) => {
    const { value, name } = evt
    this.setState({
      [name]: value,
    })
  }

  onLogin = async () => {
    const { navigation } = this.props
    const { password, email } = this.state

    try {
      const { data: { token, user } } = await http.post('login/password', {
        password,
        email,
      })

      await this.props.changeUser({
        ...user,
        token,
      })

      navigation.navigate('AppLoader')
    } catch (error) {
      const {
        response: {
          data = {},
        },
      } = error
      alert('Error al ingresar: ' + (data.message || error.message))
    }
  }

  onSignUp = () => {
    const { navigation } = this.props
    navigation.navigate('SignUp')
  }

  onBack = () => {
    const { navigation } = this.props
    navigation.navigate('Onboarding')
  }

  render () {
    const { email, password } = this.state
    return (
      <Container gradient style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo.png')} />
        <Text style={styles.title}>Iniciar sesion</Text>
        <Text style={styles.description}>
          Crea una cuenta en Luces Beautiful, para mantenerte informada de tus cursos favoritos. ¡ES GRATIS!
        </Text>
        <TextInput onChange={this.onChange} value={email} name='email' placeholder='Correo electronico' autoCapitalize='none' />
        <TextInput onChange={this.onChange} value={password} name='password' placeholder='Contraseña' mask />
        <ButtonCTA title='INGRESAR' style={{ marginTop: 20 }} onPress={this.onLogin} />
        <Text onPress={this.onBack} style={styles.text}>Ó ingresa con Facebook</Text>
        <Text onPress={this.onSignUp} style={[styles.text, { marginTop: 40 }]}>Ya tienes cuenta? Ingresa ahora</Text>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
    alignItems: 'center',
  },
  text: {
    color: '#b98a56',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  image: {
    width: 70,
    height: 50,
  },
  title: {
    marginTop: 20,
    color: '#b98955',
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    paddingHorizontal: 38,
  },
  description2: {
    color: '#b98955',
  },
})

export default withUser(LoginAccount)
