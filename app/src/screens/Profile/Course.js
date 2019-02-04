import React from 'react'
import { Image, Text } from 'react-native'
import ElevatedView from 'react-native-elevated-view'
import PropTypes from 'prop-types'

import colors from '../../utils/colors'

const Course = ({ icon, title }) => {
  return (
    <ElevatedView elevation={5} style={styles.container}>
      <Image style={styles.icon} source={icon} />
      <Text style={styles.title}>{title}</Text>
    </ElevatedView>
  )
}

Course.propTypes = {
  icon: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

const styles = {
  title: {
    fontSize: 14,
    color: colors.darkTan,
    fontWeight: 'bold',
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  container: {
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
}

export default Course
