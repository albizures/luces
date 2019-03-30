import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, ViewPropTypes, Image } from 'react-native'

const FavoriteButton = (props) => {
  const { isFavorite } = props
  const image = isFavorite
    ? require('../../assets/fav_filled.png')
    : require('../../assets/fav.png')

  const containerStyles = [
    props.style,
    styles.container,
  ]

  return (
    <TouchableHighlight {...props} elevation={10} style={containerStyles}>
      <Image source={image} style={styles.icon} resizeMode='contain' />
    </TouchableHighlight>
  )
}

FavoriteButton.propTypes = {
  style: ViewPropTypes.style,
  isFavorite: PropTypes.bool.isRequired,
}

const styles = {
  container: {
    marginRight: 25,
  },
  icon: {
    width: 25,
    height: 32,
  },
}

export default FavoriteButton
