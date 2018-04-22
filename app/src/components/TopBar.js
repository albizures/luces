import React from 'react'
import { View, TouchableHighlight, Image, Text } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../utils/colors'

const Dot = ({ icon, text, onBack }) => {
  return (
    <View
      style={styles.container}>
      {onBack ? (
        <TouchableHighlight onPress={onBack} style={styles.containerBack}>
          <Image source={require('../assets/prev.png')} style={styles.back} />
        </TouchableHighlight>
      ) : null}
      {icon ? <Image style={styles.icon} source={icon} /> : null}
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

Dot.propTypes = {
  icon: PropTypes.number.isRequired,
  onBack: PropTypes.func,
  text: PropTypes.string.isRequired
}

const styles = {
  icon: {
    width: 25,
    height: 25,
    borderRadius: 12,
    backgroundColor: colors.darkTan,
    marginRight: 12
  },
  text: {
    color: colors.darkTan,
    fontWeight: 'bold',
    fontSize: 16
  },
  containerBack: {
    position: 'absolute',
    top: 24,
    left: 20
  },
  back: {
    height: 20,
    width: 10
  },
  container: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default Dot
