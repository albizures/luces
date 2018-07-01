import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, View, AsyncStorage } from 'react-native'

import createUrl from '../utils/createUrl'
import http from '../utils/http'
import TopBar from '../components/TopBar'
import { tabBarIcon } from '../components/TabIcon'
import Course from '../components/Course'
import Container from '../components/Container'

export default class Favorites extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  static navigationOptions = {
    title: 'Favoritos',
    tabBarIcon: tabBarIcon({
      active: require('../assets/tabs/favorites_active.png'),
      inactive: require('../assets/tabs/favorites.png')
    })
  }

  state = {
    courses: [],
    refreshing: false
  }

  async getCourses () {
    this.setState({
      isLoading: true
    })
    try {
      const { data: courses } = await http.get('favorites')
      this.setState({
        courses,
        isLoading: false
      })
    } catch (error) {
      console.log(error)
      alert('No se pudieron cargar los favoritos')
      this.setState({
        isLoading: false
      })
    }
  }

  componentDidMount () {
    this.getCourses()
  }

  async remove (id) {
    try {
      await http.del(`favorites/${id}`)
      this.getCourses()
    } catch (error) {
      alert('No se pudo eliminar el curso de tus favoritos')
    }
  }

  onRefresh = async () => {
    this.setState({refreshing: true})
    try {
      await this.getCourses()
    } catch (error) {
      alert('No se pudieron actualizar los favoritos')
    }
    this.setState({refreshing: false})
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
      console.log('Home', error)
      alert('No se pudo carga el curso')
    }
  }

  onRemove = (id) => {
    Alert.alert(
      'Quitar de Favoritos',
      'Estas a punto de quitar "Curso" de tus cursos Favoritos. Lo puedes volver a listar acá cuando quieras',
      [
        {text: 'No Quitar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Quitar', onPress: () => this.remove(id)}
      ],
      { cancelable: false }
    )
  }

  render () {
    const { isLoading, courses, refreshing } = this.state
    const topBar = (
      <TopBar
        icon={require('../assets/favorites.png')}
        text='Favoritos' />
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
          {courses.map((course, index) => {
            const {image, name, description, id} = course
            return (
              <Course
                key={id}
                image={{uri: createUrl(image)}}
                title={name}
                description={description}
                onPress={() => this.onClickCourse(course)}
                onRemove={() => this.onRemove(id, index)} />
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
    marginVertical: 30
  }
}
