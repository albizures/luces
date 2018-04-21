import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import colors from '../utils/colors'

export default class Account extends Component {
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
