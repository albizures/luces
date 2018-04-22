import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { withUser } from '../components/UserContext'

import ButtonCTA from '../components/ButtonCTA'
import colors from '../utils/colors'
import ListInterests from '../components/ListInterests'

const styles = {
  container: {
    backgroundColor: '#4c4c4c',
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 20
  },
  image: {
    width: 70,
    height: 50
  },
  title: {
    marginTop: 20,
    color: '#b98955',
    fontSize: 24,
    fontWeight: 'bold'
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
  description2: {
    color: '#b98955'
  }
}

class Interests extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    changeUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
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

  goHome = () => {
    this.props.navigation.navigate('Home')
  }

  onDone = () => {
    this.props.changeUser({...this.props.user, interests: true})
    this.goHome()
  }

  render () {
    return (
      <LinearGradient colors={colors.blackGradientBackground} style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo.png')} />
        <Text style={styles.title}>Conozcámonos</Text>
        <Text style={styles.description}>
          Selecciona los temas que te gustaría aprender con <Text style={styles.description2}>Luces Beautiful</Text>
        </Text>
        <ListInterests interests={this.state.interests} />
        <ButtonCTA title='CONTINUAR' style={{marginTop: 20}} onPress={this.onDone} />
      </LinearGradient>
    )
  }
}
export default withUser(Interests)
