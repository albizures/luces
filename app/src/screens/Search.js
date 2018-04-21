import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
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
      <View style={styles.container}>
        <Text>Buscar</Text>
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
