import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView, Image, AsyncStorage } from 'react-native'

import { withCategories } from '../../components/CategoriesContext'
import { withUser } from '../../components/UserContext'
import Container from '../../components/Container'
import Highlight from '../../components/Highlight'
import Course from './Course'
import Category from './Category'
import colors from '../../utils/colors'
import http from '../../utils/http'
import { getIcon } from '../../utils/icons'

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
  section: {
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
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object,
    categories: PropTypes.object.isRequired
  }

  state = {
    courses: [],
    highlights: [],
    enabled: true,
    refreshing: false
  }

  async checkUser () {
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
      const [
        {data: courses},
        {data: highlights}
      ] = await Promise.all([
        http.get('courses'),
        http.get('courses/highlights')
      ])

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
      console.log('Home', error)
      alert('No se pudo carga el curso')
    }
  }

  onClickCategory = (category) => {
    this.props.navigation.navigate('Category', { category })
  }

  onRefresh = async () => {
    this.setState({refreshing: true})
    try {
      await this.checkUser()
    } catch (error) {
      alert('No se pudieron actualizar los cursos')
    }
    this.setState({refreshing: false})
  }

  render () {
    const { courses, highlights, refreshing } = this.state
    const { categories } = this.props

    const topBar = (
      <View style={styles.header}>
        <Image height={55} style={styles.headerLogo} source={require('../../assets/logo.png')} />
      </View>
    )
    return (
      <Container scroll gradient topBar={topBar} onRefresh={this.onRefresh} refreshing={refreshing}>
        <View style={styles.highlights}>
          <Text style={styles.title}>Cursos Beautiful</Text>
          <Text style={styles.subTitle}>Destacados</Text>
        </View>
        <ScrollView horizontal style={styles.scrollView} >
          {highlights.map(course => (
            <Highlight key={course.id} data={course} title={course.categoryName} onPress={this.onClickCourse} subTitle={course.name} image={course.image} />
          ))}
        </ScrollView>
        <View style={styles.section}>
          <Text style={[styles.title, {marginBottom: 20}]}>Todos los cursos</Text>
          {courses.map((course, index) => (
            <Course key={course.id} index={index} icon={getIcon(course.icon).checked} onPress={this.onClickCourse} course={course} />
          ))}
        </View>
        <View style={[styles.section, { borderTopColor: colors.gunmetal, borderTopWidth: 1 }]}>
          <Text style={[styles.title, {marginLeft: 20, marginBottom: 20}]}>Categorías</Text>
          {Object.keys(categories).map((categoryId, index, arr) => {
            const category = categories[categoryId]
            return (
              <Category last={arr.length - 1 === index} key={categoryId} icon={getIcon(category.icon).checked} onPress={this.onClickCategory} category={category} />
            )
          })}
        </View>
      </Container>
    )
  }
}

export default withCategories(withUser(Home))
