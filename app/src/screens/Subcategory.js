import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import createUrl from '../utils/createUrl'
import http from '../utils/http'
import TopBar from '../components/TopBar'
import Course from '../components/Course'
import Container from '../components/Container'

export default class Favorites extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }
  state = {
    courses: [],
    refreshing: false
  }

  async getCourses () {
    const { navigation } = this.props
    const { id } = navigation.getParam('subcategory')
    this.setState({
      isLoading: true
    })
    try {
      const { data: courses } = await http.get(`subcategories/${id}/courses`)
      this.setState({
        courses,
        isLoading: false
      })
    } catch (error) {
      console.log(error)
      alert('No se pudieron cargar los cursos')
      this.setState({
        isLoading: false
      })
    }
  }

  componentDidMount () {
    this.getCourses()
  }

  onRefresh = async () => {
    this.setState({refreshing: true})
    try {
      await this.getCourses()
    } catch (error) {
      console.log(error)
    }
    this.setState({refreshing: false})
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
          {courses.map(({image, name, description, id}) => (
            <Course key={id} image={{uri: createUrl(image)}} title={name} description={description} />
          ))}
        </View>
      </Container>
    )
  }
}

const styles = {
  resultsContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 30
  }
}
