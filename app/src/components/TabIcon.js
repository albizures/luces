import React from 'react'
import { Image, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

const TabIcon = ({ focused, src, activeSrc, style }) => {
  const source = focused ? activeSrc : src
  return (
    <Image
      style={[{
        height: 18,
        width: 30,
      }, style]}
      source={source}
    />
  )
}

TabIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  src: PropTypes.number.isRequired,
  activeSrc: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
}

export const tabBarIcon = ({ active, inactive, style }) => {
  const Icon = ({ focused }) => (
    <TabIcon
      style={style}
      activeSrc={active}
      src={inactive}
      focused={focused} />
  )
  Icon.propTypes = {
    focused: PropTypes.bool,
  }

  return Icon
}

export default TabIcon
