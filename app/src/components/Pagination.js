import { View } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'

import Dots from 'react-native-onboarding-swiper/src/Dots'

const Pagination = ({
  numPages,
  currentPage,
  isLight,
  bottomBarHighlight,
  bottomBarHeight,
  showSkip,
  showNext,
  showDone,
  onNext,
  onSkip,
  onDone,
  skipLabel,
  nextLabel,
  SkipButtonComponent,
  NextButtonComponent,
  DoneButtonComponent,
  DotComponent,
  gone,
}) => {
  const isLastPage = currentPage + 1 === numPages

  const SkipButtonFinal = showSkip && !isLastPage && (
    <SkipButtonComponent
      isLight={isLight}
      skipLabel={skipLabel}
      onPress={() => {
        if (typeof onSkip === 'function') {
          onSkip()
          setTimeout(gone, 500)
        }
      }}
    />
  )

  const NextButtonFinal = showNext && !isLastPage && (
    <NextButtonComponent
      nextLabel={nextLabel}
      isLight={isLight}
      onPress={onNext}
    />
  )

  const DoneButtonFinal = showDone && isLastPage && (
    <DoneButtonComponent
      isLight={isLight}
      onPress={() => {
        if (typeof onDone === 'function') {
          onDone()
          setTimeout(gone, 500)
        }
      }}
    />
  )

  return (
    <View
      style={{
        height: bottomBarHeight,
        ...styles.container,
        ...(bottomBarHighlight ? styles.overlay : {}),
      }}
    >
      <View style={styles.buttonLeft}>{SkipButtonFinal}</View>
      <Dots
        isLight={isLight}
        numPages={numPages}
        currentPage={currentPage}
        Dot={DotComponent}
        style={styles.dots}
      />
      <View style={styles.buttonRight}>
        {NextButtonFinal}
        {DoneButtonFinal}
      </View>
    </View>
  )
}

Pagination.propTypes = {
  numPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  isLight: PropTypes.bool.isRequired,
  bottomBarHighlight: PropTypes.bool.isRequired,
  bottomBarHeight: PropTypes.number.isRequired,
  showNext: PropTypes.bool.isRequired,
  showSkip: PropTypes.bool.isRequired,
  showDone: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  onSkip: PropTypes.func,
  onDone: PropTypes.func,
  skipLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  nextLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  SkipButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  DoneButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  NextButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  DotComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  gone: PropTypes.func,
}

const styles = {
  container: {
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#252525',
  },
  overlay: {
    backgroundColor: '#252525',
  },
  buttonLeft: {
    width: 200,
    flexShrink: 1,
    alignItems: 'flex-start',
  },
  buttonRight: {
    width: 200,
    flexShrink: 1,
    alignItems: 'flex-end',
  },
  dots: {
    flexShrink: 0,
    backgroundColor: 'red',
  },
}

export default Pagination
