import { Dimensions, Text, View, ImageBackground } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'

import ButtonCTA from '../../components/ButtonCTA'

const { width, height } = Dimensions.get('window')
const potrait = height > width

const Step = (props) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <ImageBackground source={require('../../assets/300x300.png')} style={styles.imageContainer} imageStyle={styles.imageBackground} />
      <View style={styles.textContainer}>
        <ButtonCTA title='INGRESA CON FACEBOOK' onPress={props.navigation} />
        <Text style={styles.text}>Ingresar sin registrarme</Text>
      </View>
    </View>
  )
}

Step.propTypes = {
  navigation: PropTypes.func
}

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
    flex: 14,
    alignContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 6,
    marginTop: 46,
    paddingHorizontal: 28,
    alignItems: 'center',
    width: '100%'
  },
  imageBackground: {
    resizeMode: 'cover'
  },
  padding: {
    paddingHorizontal: 20
  },
  text: {
    color: '#b98a56',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 26,
    textDecorationLine: 'underline'
  }
}

export default Step
