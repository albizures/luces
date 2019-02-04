import React from 'react'
import { View, ImageBackground, Image, TouchableHighlight, Text } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../utils/colors'

const Course = ({ onRemove, title, description, image, onPress }) => {
  const remove = onRemove ? <TouchableHighlight onPress={onRemove}>
    <Text style={styles.remove}>Quitar</Text>
  </TouchableHighlight> : null

  const course = (
    <View style={styles.container} elevation={10}>
      <ImageBackground source={image} style={styles.imageContainer} imageStyle={styles.image}>
        <Image source={require('../assets/play.png')} style={styles.play} />
      </ImageBackground >
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
        <Text numberOfLines={1} style={styles.description}>{description}</Text>
        {remove}
      </View>
    </View>
  )

  if (onPress) {
    return (
      <TouchableHighlight onPress={onPress}>
        {course}
      </TouchableHighlight>
    )
  }

  return course
}

Course.propTypes = {
  onRemove: PropTypes.func,
  onPress: PropTypes.func,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
}

const styles = {
  title: {
    color: colors.darkTan,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: colors.whiteTwo,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  remove: {
    textDecorationLine: 'underline',
    fontSize: 12,
    color: colors.darkTan,
    fontWeight: 'bold',
  },
  textContainer: {
    padding: 20,
    flex: 1,
  },
  play: {
    width: 40,
    height: 40,
  },
  image: {
    resizeMode: 'cover',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 100,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  container: {
    marginBottom: 20,
    overflow: 'hidden',
    height: 100,
    marginHorizontal: 5,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.black,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
}

export default Course
