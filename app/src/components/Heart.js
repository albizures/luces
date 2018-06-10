import React from 'react'
import { Image, TouchableHighlight, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

const Heart = ({ active, onPress, style }) => {
  const imageStyle = {
    width: style.width,
    height: style.height
  }
  return (
    <TouchableHighlight style={style} onPress={onPress}>
      <Image style={imageStyle} source={active ? require('../assets/like_active.png') : require('../assets/like.png')} />
    </TouchableHighlight>
  )
}

Heart.propTypes = {
  onPress: PropTypes.func.isRequired,
  active: PropTypes.bool,
  style: ViewPropTypes.style
}

export default Heart
