import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, ViewPropTypes, Text } from 'react-native'

const ButtonCTA = (props) => {
  return (
    <TouchableHighlight {...props} elevation={10} style={[props.style, styles.button]}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableHighlight>
  )
}

ButtonCTA.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string.isRequired
}

const styles = {
  button: {
    height: 50,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    borderRadius: 30,
    backgroundColor: '#b98a56',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    // marginVertical: 20,
    color: '#252525',
    fontWeight: 'bold',
    fontSize: 16
  }
}

export default ButtonCTA
