import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Image, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { withUser } from '../components/UserContext'
import { withCategories } from '../components/CategoriesContext'

import ButtonCTA from '../components/ButtonCTA'
import ListInterests from '../components/ListInterests'
import Container from '../components/Container'

import http from '../utils/http'

class LoginAccount extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onLogin = () => {
    const { navigation } = this.props
    navigation.navigate('LoginAccount')
  } 

  render () {
    return (
      <Container gradient style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo.png')} />
        <Text style={styles.title}>Iniciar sesion</Text>
        <Text style={styles.description}>
          Crea una cuenta en Luces Beautiful, para mantenerte informada de tus cursos favoritos. ¡ES GRATIS!
        </Text>
        <ButtonCTA title='CREAR CUENTA' style={{marginTop: 20}} onPress={this.onDone} />
        <Text onPress={this.onLogin} style={styles.text}>Ya tienes cuenta? Ingresa ahora</Text>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
    alignItems: 'center'
  },
  text: {
    color: '#b98a56',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 20,
    textDecorationLine: 'underline'
  },
  image: {
    width: 70,
    height: 50
  },
  title: {
    marginTop: 20,
    color: '#b98955',
    fontSize: 24,
    fontWeight: 'bold'
  },
  description: {
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    paddingHorizontal: 38
  },
  description2: {
    color: '#b98955'
  }
})

export default LoginAccount