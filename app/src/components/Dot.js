import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

const Dot = ({ isLight, selected }) => {
  let backgroundColor = selected ? '#b98955' : '#656767'
  return (
    <View
      style={{
        ...styles.dot,
        backgroundColor,
      }}
    />
  )
}

Dot.propTypes = {
  isLight: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
}

const styles = {
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
}

export default Dot
