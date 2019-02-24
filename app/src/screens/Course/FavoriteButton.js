import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, ViewPropTypes, Text, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import colors from '../../utils/colors'
import ConditionalRender from '../../components/ConditionalRender'

const ButtonCTA = (props) => {
  const { isFavorite } = props
  const image = isFavorite
    ? require('../../assets/favorite_filled2.png')
    : require('../../assets/favorite_active.png')

  const gradientProps = {
    start: { x: 0.0, y: 0.0 },
    end: { x: 1.0, y: 1.0 },
    style: styles.gradient,
    colors: ['#c79a63', '#d9b992'],
  }

  const containerStyles = [
    props.style,
    styles.button,
    isFavorite
      ? styles.filled
      : styles.unfilled,
  ]

  return (
    <TouchableHighlight {...props} elevation={10} style={containerStyles}>
      <ConditionalRender component={LinearGradient} props={gradientProps} condition={isFavorite}>
        <Image source={image} style={styles.icon} />
        <Text style={styles.text}>{props.title}</Text>
      </ConditionalRender>
    </TouchableHighlight>
  )
}

ButtonCTA.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
}

const styles = {
  icon: {
    width: 10,
    height: 17,
    marginRight: 6,
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  filled: {
    borderWidth: 0,
  },
  unfilled: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    height: 28,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderColor: colors.darkTan,
    borderWidth: 2,
    width: 100,
  },
  text: {
    // marginVertical: 20,
    color: colors.darkTan,
    fontSize: 16,
  },
}

export default ButtonCTA
