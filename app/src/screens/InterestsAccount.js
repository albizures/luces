import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Image, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import colors from '../utils/colors'

import TabIcon from '../components/TabIcon'
import TopBar from '../components/TopBar'
import ListInterests from '../components/ListInterests'

export default class Course extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  static navigationOptions = {
    title: 'Cuenta',
    tabBarIcon: ({focused}) => {
      return <TabIcon
        activeSrc={require('../assets/tabs/account_active.png')}
        src={require('../assets/tabs/account.png')}
        focused={focused} />
    }
  }

  state = {
    interests: [
      {id: 1, icon: require('../assets/categories/eyes_active.png'), text: 'Maquillaje de ojos', checked: true},
      {id: 2, icon: require('../assets/categories/hair.png'), text: 'Peinados', checked: false},
      {id: 3, icon: require('../assets/categories/nail.png'), text: 'Manicure', checked: false},
      {id: 4, icon: require('../assets/categories/lips_active.png'), text: 'Maquillaje de labios', checked: true},
      {id: 5, icon: require('../assets/categories/mask_active.png'), text: 'Mascarillas', checked: true},
      {id: 6, icon: require('../assets/categories/contour.png'), text: 'Contornos', checked: false}
    ]
  }

  onBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    return (
      <LinearGradient colors={colors.blackGradientBackground} style={styles.container}>
        <TopBar
          onBack={this.onBack}
          icon={require('../assets/favorites.png')}
          text='Intereses' />
        <View style={styles.container2}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
          <Text style={styles.description}>Selecciona las categorías que más te gusten y así sabremos que cursos recomendarte.</Text>
          <ListInterests interests={this.state.interests} />
        </View>
      </LinearGradient>
    )
  }
}

const styles = {
  logo: {
    width: 70,
    height: 50
  },
  description: {
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    paddingHorizontal: 38
  },
  container2: {
    paddingTop: 30,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    width: '100%'
  },
  container: {
    backgroundColor: colors.black,
    flex: 1,
    alignItems: 'center'
  }
}
