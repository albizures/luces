import React from 'react'
import { Image } from 'react-native'
import PropTypes from 'prop-types'

const TabIcon = ({ focused, src, activeSrc }) => {
  const source = focused ? activeSrc : src
  return (
    <Image
      style={{
        height: 18,
        width: 30
      }}
      source={source}
    />
  )
}

TabIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  src: PropTypes.number.isRequired,
  activeSrc: PropTypes.number.isRequired
}

export const tabBarIcon = ({active, inactive}) => {
  const Icon = ({focused}) => (
    <TabIcon
      activeSrc={active}
      src={inactive}
      focused={focused} />
  )
  Icon.propTypes = {
    focused: PropTypes.bool
  }

  return Icon
}

export default TabIcon
