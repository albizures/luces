import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native'
import isEmail from 'is-email-maybe'

import { withUser } from '../components/UserContext'
import ButtonCTA from '../components/ButtonCTA'
import Container from '../components/Container'
import TextInput from '../components/TextInput'

import http from '../utils/http'
import { login } from '../utils/facebook'
import TopBar from '../components/TopBar'
import TextDivider from '../components/TextDivider'

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

    if (!(email && isEmail(email))) {
      return alert('Correo invalido')
    }

    if (!password) {
      return alert('password invalido')
    }

    this.setState({ isLoading: true })

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
      this.setState({ isLoading: false })
      alert('Error al ingresar: ' + (data.message || error.message))
    }
  }

  onSignUp = () => {
    const { navigation } = this.props
    navigation.replace('SignUp')
  }

  onBack = () => {
    const { navigation } = this.props

    navigation.goBack()
  }

  onLoginFacebook = () => {
    const { navigation, changeUser } = this.props

    login({
      setLoaderStatus: (isLoading) => this.setState({ isLoading }),
      goHome: () => navigation.navigate('AppLoader'),
      changeUser,
    })
  }

  render () {
    const { email, password, isLoading } = this.state
    const topBar = (
      <TopBar
        modal
        onBack={this.onBack}
        text='Ingresar' />
    )
    return (
      <Container scroll topBar={topBar} isLoading={isLoading} gradient style={styles.container}>
        <Text style={styles.title}>Ingresa</Text>
        <Text style={styles.description}>
          Ingresa con tu cuenta Luces Beautiful
        </Text>
        <TextInput onChange={this.onChange} value={email} name='email' placeholder='Correo electronico' autoCapitalize='none' />
        <TextInput onChange={this.onChange} value={password} name='password' placeholder='Contraseña' mask />
        <ButtonCTA title='INGRESAR' style={{ marginTop: 20 }} onPress={this.onLogin} />
        <Text onPress={this.onSignUp} style={[styles.text, { marginTop: 40 }]}>¿No tienes cuenta? Crea una ahora</Text>
        <TextDivider>O también puedes</TextDivider>
        <ButtonCTA isFilled={false} title='INGRESAR CON FACEBOOK' style={{ marginVertical: 20 }} onPress={this.onLoginFacebook} />
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
