import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Switch, View, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import colors from '../utils/colors'

import TabIcon from '../components/TabIcon'
import TopBar from '../components/TopBar'

export default class Course extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  static navigationOptions = {
    title: 'Cuenta',
    tabBarIcon: ({focused}) => {
      return <TabIcon
        activeSrc={require('../assets/tabs/account_active.png')}
        src={require('../assets/tabs/account.png')}
        focused={focused} />
    }
  }

  onBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    return (
      <LinearGradient colors={colors.blackGradientBackground} style={styles.container}>
        <TopBar
          onBack={this.onBack}
          icon={require('../assets/notification.png')}
          text='Notificaciones' />
        <View style={styles.container2}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
          <Text style={styles.title}>Tus cursos</Text>
          <Text style={styles.description}>Selecciona el medio por el que quieres que te comunicaquemos de cursos nuevos.</Text>
          <View style={styles.option}>
            <Image style={styles.optionIcon} source={require('../assets/account/notifications.png')} />
            <View style={styles.optionDescription}>
              <Text style={styles.optionTitle}>Push notification</Text>
              <Text style={styles.optionSubTitle}>Nuevos Cursos</Text>
            </View>
            <Switch style={styles.optionValue} tintColor={colors.darkTan} value thumbTintColor={colors.gunmetal} onTintColor={colors.darkTan} />
          </View>
          <View style={styles.option}>
            <Image style={styles.optionIcon} source={require('../assets/account/email.png')} />
            <View style={styles.optionDescription}>
              <Text style={styles.optionTitle}>Email</Text>
              <Text style={styles.optionSubTitle}>Promociones</Text>
            </View>
            <Switch style={styles.optionValue} tintColor={colors.darkTan} value={false} thumbTintColor={colors.gunmetal} onTintColor={colors.darkTan} />
          </View>
        </View>
      </LinearGradient>
    )
  }
}

const styles = {
  optionIcon: {
    width: 15,
    height: 15,
    marginRight: 15
  },
  option: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionTitle: {
    fontSize: 14,
    color: colors.whiteTwo,
    fontWeight: '500'
  },
  optionSubTitle: {
    fontSize: 10,
    color: colors.slateGrey
  },
  optionValue: {
    width: 55
  },
  optionDescription: {
    flex: 1
  },
  container2: {
    paddingTop: 30,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    width: '100%'
  },
  logo: {
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
  container: {
    backgroundColor: colors.black,
    flex: 1,
    alignItems: 'center'
  }
}
