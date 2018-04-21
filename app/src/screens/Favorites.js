import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import colors from '../utils/colors'

export default class Favorites extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Favoritos</Text>
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
