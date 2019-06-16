import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import Container from '../../components/Container'
import TopBar from '../../components/TopBar'
import Highlight from '../../components/Highlight'
import Subcategory from './Subcategory'
import colors from '../../utils/colors'
import http from '../../utils/http'
import { getIcon } from '../../utils/icons'

class Category extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    subcategories: [],
    highlights: [],
  }

  async getData () {
    const { navigation } = this.props
    const { id: categoryId } = navigation.getParam('category')

    try {
      const { data: subcategories = [] } = await http.get(`categories/${categoryId}/subcategories`)
      const { data: highlights = [] } = await http.get(`categories/${categoryId}/highlights`)

      this.setState({ subcategories, highlights })
    } catch (error) {
      console.error(error)
      alert('No se pudieron cargar las subcategorias')
    }
  }

  componentDidMount = () => {
    this.getData()
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
      console.error('Home', error)
      alert('No se pudo carga el curso')
    }
  }

  onClickSubcategory = (subcategory) => {
    this.props.navigation.navigate('Subcategory', { subcategory })
  }

  onBack = () => {
    this.props.navigation.goBack()
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
    const { navigation } = this.props
    const { subcategories, highlights, refreshing } = this.state
    const { icon, name } = navigation.getParam('category')
    const topBar = (
      <TopBar
        onBack={this.onBack}
        icon={getIcon(icon).checked}
        text={name} />
    )

    return (
      <Container scroll gradient topBar={topBar} onRefresh={this.onRefresh} refreshing={refreshing}>
        <View style={styles.highlights}>
          <Text style={styles.title}>Cursos de {name}</Text>
          <Text style={styles.subTitle}>Destacados</Text>
        </View>
        <ScrollView horizontal style={styles.scrollView} >
          {highlights.map(course => (
            <Highlight key={course.id} data={course} title={course.categoryName} onPress={this.onClickCourse} subTitle={course.name} image={course.image} />
          ))}
        </ScrollView>
        <View style={styles.section}>
          <Text style={[styles.title, { marginBottom: 20 }]}>Subcategorias de {name}</Text>
          {subcategories.map((subcategory, index) => (
            <Subcategory key={subcategory.id} index={index} onPress={this.onClickSubcategory} subcategory={subcategory} />
          ))}
        </View>
      </Container>
    )
  }
}

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
    resizeMode: 'contain',
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
}

export default Category
