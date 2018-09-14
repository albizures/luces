import React from 'react'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import { View, ViewPropTypes, Platform, ScrollView, RefreshControl, ImageBackground } from 'react-native'

import Loading from './Loading'
import colors from '../utils/colors'

const top = Platform.OS === 'ios' ? 20 : 0

const ConditionalRender = ({component, props, condition, children}) => {
  const Component = component
  return condition ? (
    <Component {...props}>{children}</Component>
  ) : children
}

ConditionalRender.propTypes = {
  component: PropTypes.func.isRequired,
  condition: PropTypes.bool,
  children: PropTypes.node.isRequired,
  props: PropTypes.object
}

const Container = ({scroll, isLoading, children, style, gradient, topBar, onRefresh, refreshing, backgroundImage}) => {
  const refreshControl = scroll && onRefresh && refreshing !== undefined ? (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  ) : undefined

  const gradientProps = {
    colors: colors.blackGradientBackground,
    style: styles.flex
  }

  const ImageBackgroundProps = {
    source: require('../assets/logo.png'),
    style: styles.flex,
    imageStyle: styles.imageBackground
  }

  const ScrollViewProps = {
    refreshControl,
    style: styles.flex
  }

  return (
    <View style={styles.container}>
      <Loading top={top} isLoading={isLoading}>
        {topBar}
        <ConditionalRender component={LinearGradient} condition={gradient} props={gradientProps}>
          <ConditionalRender component={ImageBackground} condition={backgroundImage} props={ImageBackgroundProps}>
            <ConditionalRender component={ScrollView} condition={scroll} props={ScrollViewProps}>
              <View style={[styles.flex, style]}>
                {children}
              </View>
            </ConditionalRender>
          </ConditionalRender>
        </ConditionalRender>
      </Loading>
    </View>
  )
}

Container.propTypes = {
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  backgroundImage: PropTypes.bool,
  gradient: PropTypes.bool,
  children: PropTypes.node.isRequired,
  topBar: PropTypes.node,
  isLoading: PropTypes.bool,
  style: ViewPropTypes.style,
  scroll: PropTypes.bool
}

const styles = {
  imageBackground: {
    height: 100,
    width: 140,
    opacity: 0.16,
    top: '50%',
    left: '50%',
    marginTop: -50,
    marginLeft: -70
  },
  flex: {
    flex: 1
  },
  container: {
    backgroundColor: colors.black,
    paddingTop: top,
    flex: 1
  }
}

export default Container
