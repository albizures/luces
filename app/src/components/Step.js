import { Dimensions, Text, View, Image, ImageBackground, PixelRatio } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'

const { width, height } = Dimensions.get('window')
const potrait = height > width

const Step = (props) => {
  const {
    image,
    icon,
    title,
    description,
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
  description: PropTypes.string.isRequired,
}

Step.defaultProps = {}

const sizeIcon = 85
const borderRadiusIcon = sizeIcon / 2

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: potrait ? 'center' : 'flex-start',
    paddingTop: potrait ? 0 : 10,
    backgroundColor: '#252525',
  },
  imageContainer: {
    paddingBottom: potrait ? 30 : 10,
    width: '100%',
    flex: 10,
    alignContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 6,
    marginTop: 75,
    paddingHorizontal: 30,
  },
  imageBackground: {
    resizeMode: 'cover',
  },
  padding: {
    paddingHorizontal: 20,
  },
  iconContainer: {
    backgroundColor: '#b98a56',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    width: sizeIcon,
    height: sizeIcon,
    borderRadius: borderRadiusIcon,
    top: '95%',
  },
  icon: {
    borderRadius: borderRadiusIcon,
    width: sizeIcon,
    height: sizeIcon,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b98955',
    paddingBottom: PixelRatio.getPixelSizeForLayoutSize(2),
  },
  description: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
    color: '#fff',
  },
}

export default Step
