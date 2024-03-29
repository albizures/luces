import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import createUrl from '../utils/createUrl'
import http from '../utils/http'
import TopBar from '../components/TopBar'
import Course from '../components/Course'
import Container from '../components/Container'

export default class Favorites extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  state = {
    courses: [],
    refreshing: false,
  }

  async getCourses () {
    const { navigation } = this.props
    const { id } = navigation.getParam('subcategory')
    this.setState({
      isLoading: true,
    })
    try {
      const { data: courses = [] } = await http.get(`subcategories/${id}/courses`)
      this.setState({
        courses,
        isLoading: false,
      })
    } catch (error) {
      console.error(error)
      alert('No se pudieron cargar los cursos')
      this.setState({
        isLoading: false,
      })
    }
  }

  componentDidMount () {
    this.getCourses()
  }

  onRefresh = async () => {
    this.setState({ refreshing: true })
    try {
      await this.getCourses()
    } catch (error) {
      console.error(error)
    }
    this.setState({ refreshing: false })
  }

  onClickCourse = async (course) => {
    const { navigation } = this.props
    try {
      const started = await AsyncStorage.getItem(`course-${course.id}`)
      if (started === 'started') {
        navigation.navigate('Course', { course })
      } else {
        navigation.navigate('HomeCourse', { course })
      }
    } catch (error) {
      console.error('Home', error)
      alert('No se pudo carga el curso')
    }
  }

  onBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    const { navigation } = this.props
    const { name } = navigation.getParam('subcategory')
    const { isLoading, courses, refreshing } = this.state
    const topBar = (
      <TopBar
        onBack={this.onBack}
        text={name} />
    )
    return (
      <Container
        isLoading={isLoading}
        scroll
        gradient
        backgroundImage
        topBar={topBar}
        onRefresh={this.onRefresh}
        refreshing={refreshing}>
        <View style={styles.resultsContainer}>
          {courses.map((course) => {
            const { image, name, description, id } = course
            return (
              <Course key={id} image={{ uri: createUrl(image) }} onPress={() => this.onClickCourse(course)} title={name} description={description} />
            )
          })}
        </View>
      </Container>
    )
  }
}

const styles = {
  resultsContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 30,
  },
}
