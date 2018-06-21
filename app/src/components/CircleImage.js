import React from 'react'
import { View, Image, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

const CircleImage = ({ size, style, source, ...rest }) => {
  const container = {
    borderRadius: size / 2
  }
  const image = {
    width: size,
    height: size
  }
  return (
    <View {...rest} style={[style, styles.container, container]}>
      <Image source={source} style={image} />
    </View>
  )
}

CircleImage.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]).isRequired,
  size: PropTypes.number.isRequired,
  style: ViewPropTypes.style
}

const styles = {
  container: {
    overflow: 'hidden'
  }
}

export default CircleImage
