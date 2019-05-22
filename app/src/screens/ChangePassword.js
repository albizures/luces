import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native'

import { withUser } from '../components/UserContext'
import ButtonCTA from '../components/ButtonCTA'
import Container from '../components/Container'
import TextInput from '../components/TextInput'

import http from '../utils/http'
import TopBar from '../components/TopBar'

class ChangePassword extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    confirmPassword: '',
    password: '',
  }

  onChange = (evt) => {
    const { value, name } = evt
    this.setState({
      [name]: value,
    })
  }

  onChangePassword = async () => {
    const { navigation } = this.props
    const { password, confirmPassword } = this.state
    const token = decodeURIComponent(navigation.getParam('token'))

    this.setState({ isLoading: true })

    if (password !== confirmPassword) {
      this.setState({ isLoading: false })
      return alert('Las contraseñas ingresadas no coinciden.')
    }

    try {
      await http.post('login/password/change', {
        password,
        token,
      })

      alert('Tu contraseña se ha cambiado exitosamente.')
      navigation.navigate('AppLoader')
    } catch (error) {
      console.log(error)
      alert('No se pudo cambiar la contraseña.')
      this.setState({ isLoading: false })
    }
  }

  render () {
    const { confirmPassword, password, isLoading } = this.state
    const topBar = (
      <TopBar
        modal
        onBack={this.onBack}
        text='Recupera tu cuenta' />
    )
    return (
      <Container scroll topBar={topBar} isLoading={isLoading} gradient style={styles.container}>
        <Text style={styles.title}>Restablecer tu contraseña</Text>
        <TextInput onChange={this.onChange} value={password} name='password' placeholder='Nueva contraseña' autoCapitalize='none' mask />
        <TextInput onChange={this.onChange} value={confirmPassword} name='confirmPassword' placeholder='Confirma tu nueva contraseña' autoCapitalize='none' mask />
        <ButtonCTA title='CAMBIAR CONTRASEÑA' style={{ marginTop: 40 }} onPress={this.onChangePassword} />
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

export default withUser(ChangePassword)
