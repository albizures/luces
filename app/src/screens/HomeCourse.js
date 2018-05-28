import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import ButtonCTA from '../components/ButtonCTA'
import TopBar from '../components/TopBar'
import TabIcon from '../components/TabIcon'
import Container from '../components/Container'
import colors from '../utils/colors'

export default class CourseHome extends Component {
  static navigationOptions = {
    title: 'Cursos',
    tabBarIcon: ({focused, ...rest}) => {
      return <TabIcon
        activeSrc={require('../assets/tabs/courses_active.png')}
        src={require('../assets/tabs/courses.png')}
        focused={focused} />
    }
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  onBack = () => {
    this.props.navigation.goBack()
  }

  startCourse = () => {
    this.props.navigation.navigate('Course')
  }

  render () {
    const title = 'Uñas'
    const subTitle = 'Acrílicas Masglo'
    const image = require('../assets/300x300.png')
    const mainDescription = 'Las uñas esculpidas se han transformado poco a poco en uno de los servicios más rentables que existen dentro del área de belleza.'
    const secondaryDescription = 'Conviértete en una verdadera Maestra en Uñas, iniciándote con tratamientos integrales de manicuría.'
    const icon = require('../assets/categories/nail_active.png')
    return (
      <Container>
        <TopBar
          onBack={this.onBack}
          icon={icon}
          text={title} />
        {/* <View style={styles.header}>
          <Text>{title}</Text>
        </View> */}
        <ImageBackground elevation={20} style={styles.cover} source={image} imageStyle={styles.imageBackground} >
          <LinearGradient colors={['transparent', colors.black]} style={styles.gradient}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.description}>
          <Text style={styles.mainDescription}>{mainDescription}</Text>
          <Text style={styles.secondaryDescription}>{secondaryDescription}</Text>
          <ButtonCTA title='EMPERZAR CURSO' onPress={this.startCourse} />
        </View>
      </Container>
    )
  }
}

const styles = {
  description: {
    marginHorizontal: 18,
    marginTop: 40
  },
  mainDescription: {
    textAlign: 'center',
    color: colors.darkTan,
    fontSize: 16,
    fontWeight: '500'
  },
  secondaryDescription: {
    textAlign: 'center',
    color: colors.whiteTwo,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 30
  },
  imageBackground: {
    resizeMode: 'cover'
  },
  title: {
    color: colors.whiteTwo,
    fontSize: 20,
    fontWeight: 'bold'
  },
  subTitle: {
    color: colors.darkTan,
    fontSize: 12,
    fontWeight: '500'
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'flex-end',
    paddingBottom: 24
  },
  cover: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0
    },
    width: '100%',
    height: 270,
    shadowRadius: 7,
    shadowOpacity: 0.7
  },
  header: {
    width: '100%',
    height: 65,
    alignItems: 'center'
  }
}
