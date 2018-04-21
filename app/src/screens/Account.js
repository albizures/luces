import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import colors from '../utils/colors'

import TabIcon from '../components/TabIcon'

export default class Account extends Component {
  static navigationOptions = {
    title: 'Cuenta',
    tabBarIcon: ({focused}) => {
      return <TabIcon
        activeSrc={require('../assets/tabs/account_active.png')}
        src={require('../assets/tabs/account.png')}
        focused={focused} />
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Cuenta</Text>
      </View>
    )
  }
}

const styles = {
  container: {
    backgroundColor: colors.black,
    flex: 1
  }
}
