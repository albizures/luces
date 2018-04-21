import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import colors from '../utils/colors'

import TabIcon from '../components/TabIcon'

export default class Favorites extends Component {
  static navigationOptions = {
    title: 'Favoritos',
    tabBarIcon: ({focused}) => {
      return <TabIcon
        activeSrc={require('../assets/tabs/favorites_active.png')}
        src={require('../assets/tabs/favorites.png')}
        focused={focused} />
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Favoritos</Text>
      </View>
    )
  }
}

const styles = {
  container: {
    backgroundColor: colors.black,
    flex: 1
  }
}
