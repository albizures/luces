import React from 'react'
import { View, ViewPropTypes, Platform, ScrollView } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../utils/colors'

const CircleImage = (props) => {
  const Wrapper = props.scroll ? ScrollView : View
  return (
    <Wrapper {...props} style={[props.style, styles.container]} />
  )
}

CircleImage.propTypes = {
  style: ViewPropTypes.style,
  scroll: PropTypes.bool
}

const styles = {
  container: {
    backgroundColor: colors.black,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1
  }
}

export default CircleImage
