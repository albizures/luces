import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import createUrl from '../../utils/createUrl'

const Highlight = (props) => {
  const { course, title, subTitle } = props
  return (
    <TouchableHighlight {...props} onPress={() => props.onPress(course)} elevation={10} style={styles.box}>
      <ImageBackground source={{ uri: createUrl(props.image) }} style={styles.container} imageStyle={styles.imageBackground}>
        <LinearGradient colors={['transparent', '#252525']} style={styles.gradient}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableHighlight>
  )
}

Highlight.propTypes = {
  onPress: PropTypes.func.isRequired,
  subTitle: PropTypes.string.isRequired,
  course: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

const styles = {
  imageBackground: {
    resizeMode: 'cover',
    borderRadius: 11
  },
  gradient: {
    padding: 15,
    borderRadius: 10
  },
  box: {
    borderRadius: 10,
    height: 180,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0
    },
    width: 140,
    shadowRadius: 7,
    shadowOpacity: 0.7,
    marginRight: 15,
    marginTop: 20
  },
  container: {
    backgroundColor: 'gray',
    justifyContent: 'flex-end',
    borderRadius: 10,
    height: 180,
    width: 140
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  subTitle: {
    color: '#b98a56',
    fontWeight: '500',
    fontSize: 11,
    marginTop: 5
  }
}

export default Highlight
