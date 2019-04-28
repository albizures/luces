import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native'
import isEmail from 'is-email-maybe'

import ButtonCTA from '../components/ButtonCTA'
import Container from '../components/Container'
import TextInput from '../components/TextInput'

import http from '../utils/http'
import { login } from '../utils/facebook'
import TopBar from '../components/TopBar'
import TextDivider from '../components/TextDivider'
import { withUser } from '../components/UserContext'

class SignUp extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    changeUser: PropTypes.func.isRequired,
  }

  state = {
    name: '',
    email: '',
    password: '',
  }

  onLogin = () => {
    const { navigation } = this.props
    navigation.replace('LoginAccount')
  }

  onChange = (evt) => {
    const { name, value } = evt
    this.setState({
      [name]: value,
    })
  }

  onBack = () => {
    const { navigation } = this.props

    navigation.goBack()
  }

  onDone = async () => {
    const { navigation } = this.props
    const { name, email, password } = this.state

    if (!name) {
      return alert('Nombre invalido')
    }

    if (!(email && isEmail(email))) {
      return alert('Correo invalido')
    }

    if (!password) {
      return alert('password invalido')
    }

    this.setState({ isLoading: true })

    try {
      await http.post('login/signup', { name, email, password })
      navigation.navigate('LoginAccount')
    } catch (error) {
      console.error(error)
      this.setState({ isLoading: false })
      alert('Ocurrio un error creando el usuario:' + error.message)
    }
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
    const { name, email, password, isLoading } = this.state
    const topBar = (
      <TopBar
        modal
        onBack={this.onBack}
        text='Crear Cuenta' />
    )

    return (
      <Container scroll topBar={topBar} isLoading={isLoading} gradient style={styles.container}>
        {/* <Image style={styles.image} source={require('../assets/logo.png')} /> */}
        <Text style={styles.title}>Únete a Luces Beautiful</Text>
        <Text style={styles.description}>
          Crea una cuenta en Luces Beautiful, para mantenerte informada de tus cursos favoritos. ¡ES GRATIS!
        </Text>
        <TextInput value={name} onChange={this.onChange} name='name' placeholder='Nombre' />
        <TextInput value={email} onChange={this.onChange} name='email' placeholder='Correo electrónico' autoCapitalize='none' />
        <TextInput value={password} onChange={this.onChange} name='password' placeholder='Contraseña' mask />
        <ButtonCTA title='CREAR CUENTA' style={{ marginTop: 20 }} onPress={this.onDone} />
        <Text onPress={this.onLogin} style={[styles.text, { marginTop: 40 }]}>¿Ya tienes cuenta? Ingresa aquí</Text>
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

export default withUser(SignUp)
