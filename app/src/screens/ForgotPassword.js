import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet, Alert } from 'react-native'
import isEmail from 'is-email-maybe'

import { withUser } from '../components/UserContext'
import ButtonCTA from '../components/ButtonCTA'
import Container from '../components/Container'
import TextInput from '../components/TextInput'
import TopBar from '../components/TopBar'

import http from '../utils/http'

class ForgotPassword extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    email: '',
  }

  onChange = (evt) => {
    const { value, name } = evt
    this.setState({
      [name]: value,
    })
  }

  onBack = () => {
    const { navigation } = this.props

    navigation.goBack()
  }

  onSubmit = async () => {
    const { email } = this.state
    if (!(email && isEmail(email))) {
      return alert('Correo invalido')
    }

    this.setState({ isLoading: true })

    try {
      await http.post('login/password/forgot', { email })
      Alert.alert('¡Revisa tu correo!', 'Te enviamos un correo electrónico con instrucciones para restablecer tu contraseña.')
      this.setState({ email: '' })
    } catch (error) {
      const {
        response: {
          data = {},
        },
      } = error
      alert('Error al ingresar: ' + (data.message || error.message))
    }
    this.setState({ isLoading: false })
  }

  render () {
    const { email, isLoading } = this.state
    const topBar = (
      <TopBar
        modal
        onBack={this.onBack}
        text='Ingresar' />
    )
    return (
      <Container scroll topBar={topBar} isLoading={isLoading} gradient style={styles.container}>
        <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
        <Text style={styles.description}>
          No te preocupes, le puede pasar a cualquiera. Sólo déjanos saber tu correo electrónico y te enviaremos instrucciones para recuperar tu cuenta.
        </Text>
        <TextInput onChange={this.onChange} value={email} name='email' placeholder='Correo electronico' autoCapitalize='none' />
        <ButtonCTA title='ENVIAR' style={{ marginTop: 20 }} onPress={this.onSubmit} />
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

export default withUser(ForgotPassword)
