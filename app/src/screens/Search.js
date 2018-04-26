import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, TextInput, Image, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../utils/colors'

import TabIcon from '../components/TabIcon'
import Course from '../components/Course'

export default class Search extends Component {
  state = {
    results: []
  }
  static navigationOptions = {
    title: 'Buscar',
    tabBarIcon: ({focused}) => {
      return <TabIcon
        activeSrc={require('../assets/tabs/search_active.png')}
        src={require('../assets/tabs/search.png')}
        focused={focused} />
    }
  }

  mapResult () {
    return this.state.results.map((course, index) => (
      <Course key={index} image={course.image} title={course.title} description={course.description} />
    ))
  }

  onChange = (text) => {
    this.setState({
      results: [
        {image: require('../assets/photos/learn.jpg'), title: 'Curso de cabello', description: '¡No necesitas un salón!'},
        {image: require('../assets/photos/login.jpg'), title: 'Curso de brochas', description: '¡No necesitas un salón!'},
        {image: require('../assets/photos/share.jpg'), title: 'Curso de sombras', description: 'Estilo natural, nunca falla'}
      ]
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <LinearGradient colors={colors.blackGradientBackground} style={styles.gradient}>
          <View style={styles.topbar}>
            <View style={styles.searchIconContainer}>
              <Image style={styles.searchIcon} source={require('../assets/search.png')} />
            </View>
            <TextInput onChangeText={this.onChange} placeholderTextColor={colors.whiteTwo} placeholder='Buscar' style={styles.searchInput} />
          </View>
          <ImageBackground source={require('../assets/logo.png')} style={styles.resultsContainer} imageStyle={styles.imageBackground}>
            <Text style={styles.results}>Resultados</Text>
            {this.mapResult()}
          </ImageBackground>
        </LinearGradient>
      </View>
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
  },
  container: {
    backgroundColor: colors.black,
    paddingTop: 20,
    flex: 1
  }
}
