import React, { Component } from 'react'
import { Text, View, Image, TouchableHighlight, Alert } from 'react-native'
import PropTypes from 'prop-types'
import colors from '../../utils/colors'
import ElevatedView from 'react-native-elevated-view'

import createUrl from '../../utils/createUrl'
import http from '../../utils/http'

import { version } from '../../../package.json'
import { tabBarIcon } from '../../components/TabIcon'
import { withUser } from '../../components/UserContext'
import Container from '../../components/Container'
import CircleImage from '../../components/CircleImage'
import TopBar from '../../components/TopBar'
import Option from './Option'

class Account extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
  }

  static navigationOptions = {
    title: 'Cuenta',
    tabBarIcon: tabBarIcon({
      active: require('../../assets/tabs/account_active.png'),
      inactive: require('../../assets/tabs/account.png'),
    }),
  }

  state = {}

  async componentDidMount () {
    if (!this.checkUser()) {
      return
    }

    this.setState({ isLoading: true })

    try {
      const { data } = await http.get('login/me')
      this.setState({
        ...data,
        isLoading: false,
      })
    } catch (error) {
      console.error(error)
    }

    this.setState({ isLoading: false })
  }

  onCreateAccount = () => {
    const { navigation } = this.props

    navigation.navigate('SignUp')
  }

  checkUser () {
    const { user } = this.props
    if (!user) {
      return Alert.alert(
        '¿Quieres ser parte de la comunidad?',
        'Crea tu cuenta gratuita de Luces Beautiful para poder guardar tus cursos.',
        [
          { text: 'Crear Cuenta', onPress: this.onCreateAccount },
          {
            text: 'Cancelar',
            style: 'cancel',
          },
        ],
        { cancelable: true },
      )
    }

    return true
  }

  onLogoutOrLogin = () => {
    const { logout, navigation, user } = this.props

    if (!user) {
      return this.onCreateAccount()
    }

    navigation.navigate('Onboarding')
    logout()
  }

  navigateTo = (screen) => {
    const { navigation } = this.props

    if (!this.checkUser()) {
      return
    }

    navigation.navigate(screen)
  }

  getLogoutOrLoginOption = () => {
    const { user } = this.props

    if (user) {
      return (
        <View style={styles.logout}>
          <Image style={styles.logoutIcon} source={require('../../assets/account/logout.png')} />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </View>
      )
    }

    return (
      <View style={[styles.logout, { paddingLeft: 28 }]}>
        <Text style={styles.logoutText}>Ingresar</Text>
      </View>
    )
  }

  render () {
    const { name, cover, isLoading } = this.state
    const source = cover
      ? { uri: createUrl(cover) }
      : require('../../assets/account2.png')

    return (
      <Container gradient isLoading={isLoading}>
        <TopBar
          icon={require('../../assets/account.png')}
          text='Mi cuenta' />
        <View style={styles.profile}>
          <ElevatedView style={{ height: 130, width: 130, borderRadius: 65 }} elevation={2}>
            <CircleImage size={130} style={styles.photo} source={source} />
          </ElevatedView>
          <Text style={styles.name}>{name}</Text>
        </View>
        <Text style={styles.configuration}>Configuración</Text>
        <Option onPress={() => this.navigateTo('Notifications')} title='Notificationes' icon={require('../../assets/account/notifications.png')} />
        <Option onPress={() => this.navigateTo('InterestsAccount')} title='Intereses' icon={require('../../assets/account/interests.png')} />
        <View style={styles.logoutAbout}>
          <TouchableHighlight onPress={this.onLogoutOrLogin}>
            {this.getLogoutOrLoginOption()}
          </TouchableHighlight>
          <View style={styles.about}>
            <Image style={styles.aboutIcon} source={require('../../assets/account/about.png')} />
            <Text style={styles.aboutText}>Luces Beautiful App 2018 {'\n'} Made with ❤ by Minimo</Text>
            <Text style={styles.aboutText}>Version: {version}</Text>
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
          </View>
        </View>
      </Container>
    )
  }
}

export default withUser(Account)

const styles = {
  configuration: {
    fontSize: 18,
    color: colors.darkTan,
    marginVertical: 20,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  logoutIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  logoutText: {
    flex: 1,
    color: colors.darkTan,
    fontSize: 14,
    fontWeight: '500',
  },
  aboutText: {
    flex: 1,
    height: 35,
    color: colors.gunmetal,
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 17,
  },
  logo: {
    height: 35,
    width: 50,
    opacity: 0.4,
  },
  aboutIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
    marginTop: 5,
  },
  about: {
    flexDirection: 'row',
    height: 35,
  },
  logout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  logoutAbout: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 24,
    color: colors.darkTan,
    marginBottom: 5,
    marginTop: 20,
    fontWeight: 'bold',
  },
  photo: {
    marginBottom: 20,
  },
  profile: {
    paddingTop: 30,
    alignItems: 'center',
  },
}
