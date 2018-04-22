import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
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
          icon={require('../assets/account.png')}
          text='Mi perfil' />
        <Text>Profile</Text>
      </LinearGradient>
    )
  }
}

const styles = {
  container: {
    backgroundColor: colors.black,
    flex: 1
  }
}
