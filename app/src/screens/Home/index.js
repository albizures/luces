import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView, Image, AsyncStorage } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { withUser } from '../../components/UserContext'
import TabIcon from '../../components/TabIcon'
import Container from '../../components/Container'
import Highlight from './Highlight'
import Course from './Course'
import colors from '../../utils/colors'
import http from '../../utils/http'
import icons from '../../utils/icons'

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingTop: 20
  },
  gradient: {
    flex: 1
  },
  header: {
    height: 65,
    width: '100%',
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5
  },
  headerLogo: {
    height: 35,
    resizeMode: Image.resizeMode.contain
  },
  highlights: {
    height: 50,
    marginHorizontal: 15,
    marginTop: 24
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 14,
    color: '#b98a56',
    fontWeight: '500'
  },
  courses: {
    backgroundColor: '#252525',
    paddingTop: 20,
    paddingHorizontal: 10,
    width: '100%',
    flex: 1
  },
  scrollView: {
    height: 222,
    paddingHorizontal: 15
  }
}

class Home extends Component {
  static navigationOptions = {
    title: 'Cursos',
    tabBarIcon: ({focused, ...rest}) => {
      return <TabIcon
        activeSrc={require('../../assets/tabs/courses_active.png')}
        src={require('../../assets/tabs/courses.png')}
        focused={focused} />
    }
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object
  }

  state = {
    courses: [],
    highlights: [],
    enabled: true
  }

  async checkUser () {
    console.log('ulala', this.props.user)

    if (this.props.user === null) {
      return this.props.navigation.navigate('Onboarding')
    } else if (this.props.user) {
      if (!this.props.user.interests) {
        return this.props.navigation.navigate('Interests')
      }
    } else if (this.props.user === undefined) {
      return
    }

    try {
      console.log(this.props.user)

      const [
        {data: courses},
        {data: highlights}
      ] = await Promise.all([
        http.get('courses'),
        http.get('courses/highlights')
      ])

      console.log(courses, highlights)

      this.setState({courses, highlights})
    } catch (e) {
      console.log(e)
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.user !== prevProps.user) {
      this.checkUser()
    }
  }

  componentDidMount = () => {
    this.checkUser()
    // Navigation.showModal({
    //   screen: 'Onboarding',
    //   title: 'Onboarding',
    //   animationType: 'slide-up',
    //   navigatorButtons: {}
    // })
  }

  onTouchStart = () => {
    this.setState({ enabled: false })
  }

  onMomentumScrollEnd = () => {
    this.setState({ enabled: true })
  }

  onScrollEndDrag = () => {
    this.setState({ enabled: true })
  }

  onClickCourse = async (course) => {
    try {
      const started = await AsyncStorage.getItem(`course-${course.id}`)
      if (started === 'started') {
        this.props.navigation.navigate('Course', { course })
      } else {
        this.props.navigation.navigate('HomeCourse', { course })
      }
    } catch (error) {
      alert('algo malo paso')
    }
  }

  render () {
    const { courses, highlights } = this.state
    return (
      <Container>
        <LinearGradient colors={colors.blackGradientBackground} style={styles.gradient}>
          <ScrollView
            style={{flex: 1}}>
            <View style={styles.header}>
              <Image height={55} style={styles.headerLogo} source={require('../../assets/logo.png')} />
            </View>
            <View style={styles.highlights}>
              <Text style={styles.title}>Cursos Beautiful</Text>
              <Text style={styles.subTitle}>Destacados</Text>
            </View>
            <ScrollView horizontal style={styles.scrollView} >
              {highlights.map(course => (
                <Highlight key={course.id} course={course} title={course.categoryName} onPress={this.onClickCourse} subTitle={course.name} image={course.image} />
              ))}
            </ScrollView>
            <View style={styles.courses}>
              <Text style={[styles.title, {marginLeft: 20, marginBottom: 20}]}>Todos los cursos</Text>
              {courses.map((course, index) => (
                <Course key={course.id} index={index} icon={icons[course.icon].checked} onPress={this.onClickCourse} course={course} />
              ))}
            </View>
          </ScrollView>
        </LinearGradient>
      </Container>
    )
  }
}

export default withUser(Home)
