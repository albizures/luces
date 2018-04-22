import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import colors from '../utils/colors'

export default class Course extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Course</Text>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.black
  }
}
