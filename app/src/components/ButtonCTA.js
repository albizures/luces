import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, ViewPropTypes, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import colors from '../utils/colors'

const ButtonCTA = (props) => {
  const { isFilled } = props
  const containerStyles = [
    props.style,
    styles.button,
    isFilled
      ? styles.filled
      : styles.unfilled,
  ]

  const textStyles = [
    styles.text,
    isFilled
      ? styles.textFilled
      : styles.textUnfilled,
  ]

  const gradientColors = isFilled
    ? ['#c79a63', '#d9b992']
    : ['transparent', 'transparent']

  return (
    <TouchableHighlight {...props} elevation={10} style={containerStyles}>
      <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.gradient} colors={gradientColors}>
        <Text style={textStyles}>{props.title}</Text>
      </LinearGradient>
    </TouchableHighlight>
  )
}

ButtonCTA.defaultProps = {
  isFilled: true,
}

ButtonCTA.propTypes = {
  isFilled: PropTypes.bool,
  style: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
}

const styles = {
  filled: {
    borderWidth: 0,
  },
  unfilled: {
    borderColor: colors.darkTan,
    borderWidth: 2,
  },
  textUnfilled: {
    color: colors.darkTan,
  },
  textFilled: {
    color: '#252525',
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  button: {
    height: 50,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    borderRadius: 30,
    backgroundColor: 'transparent',
    width: '100%',
  },
  text: {
    color: '#252525',
    fontWeight: 'bold',
    fontSize: 16,
  },
}

export default ButtonCTA
