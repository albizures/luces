import { Dimensions, Text, View, Image, ImageBackground } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'

const { width, height } = Dimensions.get('window')
const potrait = height > width

const Step = (props) => {
  const {
    image,
    icon,
    title,
    description
  } = props
  let titleElement = title
  if (typeof title === 'string' || title instanceof String) {
    titleElement = (
      <View style={styles.padding}>
        <Text style={[styles.title]}>
          {title}
        </Text>
      </View>
    )
  }

  let descriptionElement = description
  if (typeof description === 'string' || description instanceof String) {
    descriptionElement = (
      <View style={styles.padding}>
        <Text style={[styles.description]}>
          {description}
        </Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, { width, height }]}>
      <ImageBackground source={image} style={styles.imageContainer} imageStyle={styles.imageBackground} >
        <View elevation={10} style={styles.iconContainer}>
          <Image source={icon} style={styles.icon} />
        </View>
      </ImageBackground>
      <View style={styles.textContainer}>
        {titleElement}
        {descriptionElement}

      </View>
    </View>
  )
}

Step.propTypes = {
  image: PropTypes.number.isRequired,
  icon: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

Step.defaultProps = {}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: potrait ? 'center' : 'flex-start',
    paddingTop: potrait ? 0 : 10,
    backgroundColor: '#252525'
  },
  imageContainer: {
    paddingBottom: potrait ? 60 : 10,
    width: '100%',
    flex: 12,
    alignContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 8,
    marginTop: 75
  },
  imageBackground: {
    resizeMode: 'cover'
  },
  padding: {
    paddingHorizontal: 20
  },
  iconContainer: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    width: 100,
    height: 100,
    borderRadius: 50,
    top: '100%'
  },
  icon: {
    borderRadius: 50,
    width: 100,
    height: 100
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    color: '#b98955',
    paddingBottom: 15
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff'
  }
}

export default Step
