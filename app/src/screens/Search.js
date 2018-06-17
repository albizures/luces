import React, { Component } from 'react'
import debounce from 'lodash.debounce'
// import PropTypes from 'prop-types'
import { View, Text, TextInput, Image, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
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

  state = {}

  static navigationOptions = {
    title: 'Buscar',
    tabBarIcon: tabBarIcon({
      active: require('../assets/tabs/search_active.png'),
      inactive: require('../assets/tabs/search.png')
    })
  }

  mapResults () {
    const { results } = this.state
    if (!Array.isArray(results)) {
      return null
    }
    if (results.length === 0) {
      return <Text style={{color: colors.whiteTwo}}>No se encontro ningun resultado</Text>
    }
    return results.map((course, index) => (
      <Course key={index} image={{uri: createUrl(course.image)}} title={course.name} description={course.description} />
    ))
  }

  search = async (text) => {
    if (!text) {
      return this.setState({
        results: undefined
      })
    }
    const { data: results } = await http.get('courses/search/' + text)
    console.log(results)
    this.setState({
      results: results
    })
  }

  onChange = (text) => {
    this.search(text)
  }

  render () {
    return (
      <Container>
        <LinearGradient colors={colors.blackGradientBackground} style={styles.gradient}>
          <View style={styles.topbar}>
            <View style={styles.searchIconContainer}>
              <Image style={styles.searchIcon} source={require('../assets/search.png')} />
            </View>
            <TextInput onChangeText={this.onChange} placeholderTextColor={colors.whiteTwo} placeholder='Buscar' style={styles.searchInput} />
          </View>
          <ImageBackground source={require('../assets/logo.png')} style={styles.resultsContainer} imageStyle={styles.imageBackground}>
            <Text style={styles.results}>Resultados</Text>
            {this.mapResults()}
          </ImageBackground>
        </LinearGradient>
      </Container>
    )
  }
}

const styles = {
  results: {
    color: colors.darkTan,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  imageBackground: {
    height: 100,
    width: 140,
    opacity: 0.16,
    top: '50%',
    left: '50%',
    marginTop: -50,
    marginLeft: -70
  },
  resultsContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  searchIcon: {
    width: 25,
    height: 25,
    marginHorizontal: 5
  },
  searchIconContainer: {
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gunmetal
  },
  topbar: {
    paddingTop: 18,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.black
  },
  searchInput: {
    color: colors.whiteTwo,
    fontSize: 14,
    fontWeight: '500',
    width: '70%',
    height: 35,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: colors.gunmetal
  },
  gradient: {
    flex: 1
  }
}
