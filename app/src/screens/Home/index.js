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
    paddingTop: 20,
  },
  gradient: {
    flex: 1,
  },
  header: {
    height: 65,
    width: '100%',
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  headerLogo: {
    height: 35,
    resizeMode: Image.resizeMode.contain,
  },
  highlights: {
    height: 50,
    marginHorizontal: 15,
    marginTop: 24,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: '#b98a56',
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#252525',
    paddingTop: 20,
    paddingHorizontal: 10,
    width: '100%',
    flex: 1,
  },
  scrollView: {
    height: 222,
    paddingHorizontal: 15,
  },
  allCourses: {
    marginBottom: 22,
    textAlign: 'center',
    color: colors.darkTan,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
}

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
  }

  state = {
    courses: [],
    highlights: [],
    enabled: true,
    refreshing: false,
  }

  async checkUser () {
    const { user, navigation } = this.props
    if (!user.interests) {
      try {
        const { data: interests } = await http.get('interests/user')

        if (interests.length === 0) {
          return navigation.navigate('Interests')
        }
      } catch (error) {
        console.log('we couldn`t get the interests', error)
      }
    }

    try {
      const [
        { data: courses = [] },
        { data: highlights = [] },
      ] = await Promise.all([
        http.get('courses/latest'),
        http.get('courses/highlights'),
      ])

      this.setState({ courses, highlights })
    } catch (error) {
      console.log(error)
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

  onClickAllCourses = () => {
    this.props.navigation.navigate('Courses')
  }

  onClickCategory = (category) => {
    this.props.navigation.navigate('Category', { category })
  }

  onRefresh = async () => {
    this.setState({ refreshing: true })
    try {
      await this.checkUser()
    } catch (error) {
      alert('No se pudieron actualizar los cursos')
    }
    this.setState({ refreshing: false })
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
          <Text style={[styles.title, { marginBottom: 20 }]}>Los últimos cursos</Text>
          {courses.map((course, index) => (
            <Course key={course.id} index={index} icon={getIcon(course.icon).checked} onPress={this.onClickCourse} course={course} />
          ))}
          <Text style={styles.allCourses} onPress={this.onClickAllCourses}>Todos los cursos</Text>
        </View>
        <View style={[styles.section, { borderTopColor: colors.gunmetal, borderTopWidth: 1 }]}>
          <Text style={[styles.title, { marginBottom: 20 }]}>Categorías</Text>
          {Object.keys(categories).map((categoryId, index, arr) => {
            const category = categories[categoryId]
            return (
              <Category last={arr.length - 1 === index} key={categoryId} icon={getIcon(category.icon).unchecked} onPress={this.onClickCategory} category={category} />
            )
          })}
        </View>
      </Container>
    )
  }
}

export default withCategories(withUser(Home))
