import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, ViewPropTypes, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const ButtonCTA = (props) => {
  return (
    <TouchableHighlight {...props} elevation={10} style={[props.style, styles.button]}>
      <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.gradient} colors={['#c79a63', '#d9b992']}>
        <Text style={styles.text}>{props.title}</Text>
      </LinearGradient>
    </TouchableHighlight>
  )
}

ButtonCTA.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
}

const styles = {
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
    backgroundColor: '#b98a56',
    width: '100%',
  },
  text: {
    // marginVertical: 20,
    color: '#252525',
    fontWeight: 'bold',
    fontSize: 16,
  },
}

export default ButtonCTA
