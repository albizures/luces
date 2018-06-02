import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, ImageBackground, AsyncStorage } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { PORT, HOST } from 'react-native-dotenv'

import ButtonCTA from '../components/ButtonCTA'
import TopBar from '../components/TopBar'
import TabIcon from '../components/TabIcon'
import Container from '../components/Container'
import colors from '../utils/colors'
import icons from '../utils/icons'
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

  startCourse = async () => {
    const { navigation } = this.props
    const course = navigation.getParam('course', {})
    try {
      await AsyncStorage.setItem(`course-${course.id}`, 'started')
      this.props.navigation.navigate('Course', { course })
    } catch (error) {
      alert('No se pudo comenzar el curso intentelo de nuevo')
    }
  }

  render () {
    const { navigation } = this.props
    const course = navigation.getParam('course', {})

    const { name: title, categoryName: subTitle, image, description, icon: iconId } = course
    const icon = icons[iconId].checked

    return (
      <Container>
        <TopBar
          onBack={this.onBack}
          icon={icon}
          text={title} />
        {/* <View style={styles.header}>
          <Text>{title}</Text>
        </View> */}
        <ImageBackground elevation={20} style={styles.cover} source={{uri: `http://${HOST}:${PORT}/${image}`}} imageStyle={styles.imageBackground} >
          <LinearGradient colors={['transparent', colors.black]} style={styles.gradient}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.description}>
          <Text style={styles.mainDescription}>{description}</Text>
          {/* <Text style={styles.secondaryDescription}>{secondaryDescription}</Text> */}
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
    fontWeight: '500',
    // minHeight: 100,
    marginBottom: 30
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
