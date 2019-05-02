import React from 'react'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView, View, ViewPropTypes, Platform, ScrollView, RefreshControl, ImageBackground } from 'react-native'
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

import Loading from './Loading'
import colors from '../utils/colors'
import ConditionalRender from './ConditionalRender'

const top = Platform.OS === 'ios' ? 20 : 0

const Container = (props) => {
  const {
    scroll,
    isLoading,
    children,
    style,
    gradient,
    topBar,
    onRefresh,
    refreshing,
    backgroundImage,
    keyboardChildren,
    modal,
  } = props
  const refreshControl = scroll && onRefresh && refreshing !== undefined ? (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  ) : undefined

  const gradientProps = {
    colors: colors.blackGradientBackground,
    style: styles.flex,
  }

  const ImageBackgroundProps = {
    source: require('../assets/logo.png'),
    style: styles.flex,
    imageStyle: styles.imageBackground,
  }

  const ScrollViewProps = {
    refreshControl,
    style: styles.flex,
    keyboardShouldPersistTaps: 'never',
    keyboardDismissMode: 'on-drag',
  }

  const keyboard = keyboardChildren ? (
    <KeyboardAccessoryView style={{backgroundColor: colors.gunmetal}} hideBorder alwaysVisible androidAdjustResize inSafeAreaView>
      {keyboardChildren}
    </KeyboardAccessoryView>
  ) : null

  return (
    <SafeAreaView style={styles.container}>
      <Loading top={top} isLoading={isLoading}>
        {topBar}
        <ConditionalRender component={LinearGradient} condition={gradient} props={gradientProps}>
          <ConditionalRender component={ImageBackground} condition={backgroundImage} props={ImageBackgroundProps}>
            <ConditionalRender component={ScrollView} condition={scroll} props={ScrollViewProps}>
              <View style={[styles.flex, style]}>
                {children}
              </View>
            </ConditionalRender>
            {modal}
            {keyboard}
          </ConditionalRender>
        </ConditionalRender>
      </Loading>
    </SafeAreaView>
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
  scroll: PropTypes.bool,
  keyboardChildren: PropTypes.node,
  modal: PropTypes.node,
}

const styles = {
  imageBackground: {
    height: 120,
    width: 170,
    opacity: 0.16,
    top: '50%',
    left: '50%',
    marginTop: -60,
    marginLeft: -85,
  },
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.black,
    paddingTop: top,
    flex: 1,
  },
}

export default Container
