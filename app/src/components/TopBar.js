import React from 'react'
import { View, TouchableHighlight, Image, Text } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../utils/colors'
import CircleImage from './CircleImage'

const TopBar = ({ icon, text, onBack, modal }) => {
  const styleModal = modal ? {
    transform: [{
      rotate: '-90deg'
    }]
  } : {}

  return (
    <View
      style={styles.container}>
      {onBack ? (
        <TouchableHighlight onPress={onBack} style={[styles.containerBack, styleModal]}>
          <Image source={require('../assets/prev.png')} style={styles.back} />
        </TouchableHighlight>
      ) : null}
      {icon ? <CircleImage size={26} style={styles.icon} source={icon} /> : null}
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

TopBar.propTypes = {
  icon: PropTypes.number,
  modal: PropTypes.bool,
  onBack: PropTypes.func,
  text: PropTypes.string.isRequired
}

const styles = {
  icon: {
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

export default TopBar
