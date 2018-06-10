import React from 'react'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import { View, ViewPropTypes, Platform, ScrollView, RefreshControl } from 'react-native'

import Loading from './Loading'
import colors from '../utils/colors'

const top = Platform.OS === 'ios' ? 20 : 0

// eslint-disable-next-line react/prop-types
const withWrapper = ({scroll, children, style, topBar, onRefresh, refreshing}) => {
  let Wrapper = scroll ? ScrollView : View
  let elements = children

  const refreshControl = scroll && onRefresh && refreshing !== undefined ? (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  ) : undefined
  if (topBar) {
    return (
      <View style={styles.container}>
        {topBar}
        <Wrapper style={[{flex: 1}, style]} refreshControl={refreshControl}>
          {elements}
        </Wrapper>
      </View>
    )
  }
  return (
    <Wrapper style={[style, styles.container]} refreshControl={refreshControl}>
      {children}
    </Wrapper>
  )
}

const Container = ({scroll, isLoading, children, style, gradient, topBar, onRefresh, refreshing}) => {
  let elements = (
    <Loading top={top} isLoading={isLoading}>
      {children}
    </Loading>
  )

  if (gradient) {
    elements = (
      <LinearGradient colors={colors.blackGradientBackground} style={styles.gradient}>
        {children}
      </LinearGradient>
    )
  }

  let screen = withWrapper({
    scroll,
    children: elements,
    style,
    topBar,
    refreshing,
    onRefresh
  })
  return screen
}

Container.propTypes = {
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  gradient: PropTypes.bool,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  style: ViewPropTypes.style,
  scroll: PropTypes.bool
}

const styles = {
  gradient: {
    flex: 1
  },
  container: {
    backgroundColor: colors.black,
    paddingTop: top,
    flex: 1
  }
}

export default Container
