import React from 'react'
import { View, ViewPropTypes, TouchableHighlight, Text } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../../utils/colors'

const Course = (props) => {
  const { course } = props
  return (
    <TouchableHighlight {...props} style={[props.style, styles.touchable]}>
      <View style={styles.container}>
        <View style={styles.icon} />
        <View style={styles.text}>
          <Text style={styles.title}>{course.name}</Text>
          <Text style={styles.subTitle}>Por {course.author}</Text>
        </View>
        <View style={styles.arrow} />
      </View>
    </TouchableHighlight>
  )
}

Course.propTypes = {
  style: ViewPropTypes.style,
  course: PropTypes.object.isRequired
}

const styles = {
  touchable: {
    flex: 1,
    width: '100%'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    marginBottom: 18
  },
  text: {
    flex: 1
  },
  title: {
    fontSize: 14,
    color: colors.darkTan,
    fontWeight: 'bold'
  },
  subTitle: {
    color: colors.whiteTwo,
    fontSize: 12,
    fontWeight: '500'
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: colors.darkTan
  },
  arrow: {
    backgroundColor: colors.darkTan,
    width: 8,
    height: 15
  }
}

export default Course
