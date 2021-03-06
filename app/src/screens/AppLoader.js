import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import SplashScreen from 'react-native-splash-screen'

import { withCategories, getValue as getCategoryValue } from '../components/CategoriesContext'
import { withUser } from '../components/UserContext'
import Container from '../components/Container'

import http from '../utils/http'

class AppLoader extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    changeUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    setCategories: PropTypes.func.isRequired,
  }

  state = {
    isLoading: false,
  }

  constructor (props) {
    super(props)
    this.bootstrap().catch((error) => {
      console.error(error)
    })
  }

  async getCategories () {
    const { data: categories } = await http.get('categories')
    return categories
  }

  async bootstrap () {
    const { navigation } = this.props
    const { changeUser, setCategories } = this.props
    try {
      const [token, categories] = await Promise.all([
        AsyncStorage.getItem('token'),
        this.getCategories(),
      ])

      if (Array.isArray(categories)) {
        setCategories(getCategoryValue(categories))
      }

      if (token) {
        const interests = await AsyncStorage.getItem('interests')
        const userId = await AsyncStorage.getItem('userId')
        await changeUser({
          token,
          userId: Number(userId),
          interests: Boolean(interests),
        })
      }

      const onboarding = await AsyncStorage.getItem('onboarding')

      navigation.navigate(onboarding === 'seen' ? 'App' : 'Onboarding')
    } catch (error) {
      const { logout } = this.props
      console.error('AppLoader', error)
      navigation.navigate('Onboarding')
      await logout()
      alert('Ocurrio un error cargando el usuario')
    }
    SplashScreen.hide()
  }

  render () {
    const { isLoading } = this.state
    return (
      <Container isLoading={isLoading}>
        <Text>Cargando...</Text>
      </Container>
    )
  }
}

export default withUser(withCategories(AppLoader))
