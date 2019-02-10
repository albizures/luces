import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import { View, Text, TextInput, Image, AsyncStorage } from 'react-native'
import colors from '../utils/colors'

import { tabBarIcon } from '../components/TabIcon'
import createUrl from '../utils/createUrl'
import Course from '../components/Course'
import Container from '../components/Container'
import http from '../utils/http'

export default class Search extends Component {
  constructor () {
    super()
    this.search = debounce(this.search, 400)
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {}

  static navigationOptions = {
    title: 'Buscar',
    tabBarIcon: tabBarIcon({
      active: require('../assets/tabs/search_active.png'),
      inactive: require('../assets/tabs/search.png'),
    }),
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

  mapResults () {
    const { results } = this.state
    if (!Array.isArray(results)) {
      return null
    }
    if (results.length === 0) {
      return <Text style={{ color: colors.whiteTwo }}>No se encontro ningun resultado</Text>
    }
    return results.map((course, index) => (
      <Course
        key={index}
        course={course}
        image={{ uri: createUrl(course.image) }}
        onPress={() => this.onClickCourse(course)}
        title={course.name}
        description={course.description} />
    ))
  }

  search = async (text) => {
    if (!text) {
      return this.setState({
        results: undefined,
      })
    }
    const { data: results } = await http.get('courses/search/' + text)
    this.setState({ results })
  }

  onChange = (text) => {
    this.search(text)
  }

  render () {
    const topBar = (
      <View style={styles.topbar}>
        <View style={styles.searchIconContainer}>
          <Image style={styles.searchIcon} source={require('../assets/search.png')} />
        </View>
        <TextInput onChangeText={this.onChange} placeholderTextColor={colors.whiteTwo} placeholder='Buscar' style={styles.searchInput} />
      </View>
    )

    return (
      <Container gradient scroll backgroundImage topBar={topBar}>
        <View style={styles.resultsContainer}>
          <Text style={styles.results}>Resultados</Text>
          {this.mapResults()}
        </View>
      </Container>
    )
  }
}

const styles = {
  results: {
    color: colors.darkTan,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultsContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchIcon: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
  searchIconContainer: {
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gunmetal,
  },
  topbar: {
    paddingTop: 18,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.black,
  },
  searchInput: {
    color: colors.whiteTwo,
    fontSize: 14,
    fontWeight: '500',
    width: '70%',
    height: 35,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: colors.gunmetal,
  },
}
