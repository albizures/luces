import React from 'react'
import { View, TouchableHighlight, Image, Text, Share } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../utils/colors'
import CircleImage from './CircleImage'

const TopBar = ({ icon, text, onBack, modal, shareText }) => {
  const styleModal = modal ? {
    transform: [{
      rotate: '-90deg',
    }],
  } : {}
  const backButton = onBack ? (
    <TouchableHighlight onPress={onBack} style={[styles.containerBack, styleModal]}>
      <Image source={require('../assets/prev.png')} style={styles.back} />
    </TouchableHighlight>
  ) : null

  const iconElement = icon ? <CircleImage size={26} style={styles.icon} source={icon} /> : null
  const share = shareText ? (
    <Text
      onPress={() => Share.share({
        message: shareText,
        title: 'Luces Beautiful App',
      })}
      style={[styles.text, styles.share]}>
      Compartir
    </Text>
  ) : null

  return (
    <View
      style={styles.container}>
      {backButton}
      <View style={styles.title}>
        {iconElement}
        <Text style={styles.text}>{text}</Text>
      </View>
      {share}
    </View>
  )
}

TopBar.propTypes = {
  icon: PropTypes.number,
  modal: PropTypes.bool,
  onBack: PropTypes.func,
  text: PropTypes.string.isRequired,
  shareText: PropTypes.string.isRequired,
}

const styles = {
  icon: {
    backgroundColor: colors.darkTan,
    marginRight: 12,
  },
  share: {
    position: 'absolute',
    top: 24,
    right: 24,
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  text: {
    color: colors.darkTan,
    fontWeight: 'bold',
    fontSize: 16,
  },
  containerBack: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  back: {
    height: 20,
    width: 10,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  container: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default TopBar
