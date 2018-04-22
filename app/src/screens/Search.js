import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, TextInput, Image, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../utils/colors'

import TabIcon from '../components/TabIcon'

export default class Search extends Component {
  static navigationOptions = {
    title: 'Buscar',
    tabBarIcon: ({focused}) => {
      return <TabIcon
        activeSrc={require('../assets/tabs/search_active.png')}
        src={require('../assets/tabs/search.png')}
        focused={focused} />
    }
  }

  render () {
    return (
      <LinearGradient colors={colors.blackGradientBackground} style={styles.container}>
        <View style={styles.topbar}>
          <View style={styles.searchIconContainer}>
            <Image style={styles.searchIcon} source={require('../assets/search.png')} />
          </View>
          <TextInput placeholderTextColor={colors.whiteTwo} placeholder='Buscar' style={styles.searchInput} />
        </View>
        <ImageBackground source={require('../assets/logo.png')} style={styles.resultsContainer} imageStyle={styles.imageBackground}>
          <Text>Buscar</Text>
        </ImageBackground>
      </LinearGradient>
    )
  }
}

const styles = {
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
    flex: 1
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
  container: {
    backgroundColor: colors.black,
    flex: 1
  }
}
