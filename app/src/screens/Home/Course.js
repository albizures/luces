import React from 'react'
import { View, ViewPropTypes, TouchableHighlight, Text, Image } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../../utils/colors'

const Course = (props) => {
  const { course, style, icon } = props
  return (
    <TouchableHighlight {...props} style={[style, styles.touchable]}>
      <View style={styles.container}>
        <Image source={icon} style={styles.icon} />
        <View style={styles.text}>
          <Text style={styles.title}>{course.name}</Text>
          <Text style={styles.subTitle}>Por {course.author}</Text>
        </View>
        <Image style={styles.arrow} source={require('../../assets/next.png')} />
      </View>
    </TouchableHighlight>
  )
}

Course.propTypes = {
  icon: PropTypes.number.isRequired,
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
    width: 12,
    height: 24,
    marginRight: 5
  }
}

export default Course