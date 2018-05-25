import React from 'react'
import { View, ViewPropTypes, Platform, ScrollView } from 'react-native'
import PropTypes from 'prop-types'

import Loading from './Loading'
import colors from '../utils/colors'

const top = Platform.OS === 'ios' ? 20 : 0

const Container = (props) => {
  const Wrapper = props.scroll ? ScrollView : View
  return (
    <Wrapper style={[props.style, styles.container]}>
      <Loading top={top} isLoading={props.isLoading}>
        {props.children}
      </Loading>
    </Wrapper>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  style: ViewPropTypes.style,
  scroll: PropTypes.bool
}

const styles = {
  container: {
    backgroundColor: colors.black,
    paddingTop: top,
    flex: 1
  }
}

export default Container
