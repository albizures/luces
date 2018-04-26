import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import PropTypes from 'prop-types'
import colors from '../../utils/colors'
import LinearGradient from 'react-native-linear-gradient'

import TabIcon from '../../components/TabIcon'
import TopBar from '../../components/TopBar'
import Option from './Option'

export default class Account extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  static navigationOptions = {
    title: 'Cuenta',
    tabBarIcon: ({focused}) => {
      return <TabIcon
        activeSrc={require('../../assets/tabs/account_active.png')}
        src={require('../../assets/tabs/account.png')}
        focused={focused} />
    }
  }

  render () {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <LinearGradient colors={colors.blackGradientBackground} style={styles.gradient}>
          <TopBar
            icon={require('../../assets/account.png')}
            text='Mi cuenta' />
          <Option onPress={() => navigation.navigate('Profile')} title='Mi Perfil' icon={require('../../assets/account/profile.png')} />
          <Option onPress={() => navigation.navigate('Notifications')} title='Notificationes' icon={require('../../assets/account/notifications.png')} />
          <Option onPress={() => navigation.navigate('InterestsAccount')} title='Intereses' icon={require('../../assets/account/interests.png')} />
          <View style={styles.logoutAbout}>
            <View style={styles.logout}>
              <Image style={styles.logoutIcon} source={require('../../assets/account/logout.png')} />
              <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </View>
            <View style={styles.about}>
              <Image style={styles.aboutIcon} source={require('../../assets/account/about.png')} />
              <Text style={styles.aboutText}>Luces Beautiful App 2018 {'\n'} Made with ❤ by Minimo</Text>
              <Image style={styles.logo} source={require('../../assets/logo.png')} />
            </View>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

const styles = {
  logoutIcon: {
    width: 18,
    height: 18,
    marginRight: 10
  },
  logoutText: {
    flex: 1,
    color: colors.darkTan,
    fontSize: 14,
    fontWeight: '500'
  },
  aboutText: {
    flex: 1,
    height: 35,
    color: colors.gunmetal,
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 17
  },
  logo: {
    height: 35,
    width: 50,
    opacity: 0.4
  },
  aboutIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
    marginTop: 5
  },
  about: {
    flexDirection: 'row',
    height: 35
  },
  logout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48
  },
  logoutAbout: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  gradient: {
    flex: 1
  },
  container: {
    backgroundColor: colors.black,
    paddingTop: 20,
    flex: 1
  }
}