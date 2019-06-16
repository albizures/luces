import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Image, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { withUser } from '../components/UserContext'
import { withCategories } from '../components/CategoriesContext'

import ButtonCTA from '../components/ButtonCTA'
import ListInterests from '../components/ListInterests'
import Container from '../components/Container'

import http from '../utils/http'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 50,
  },
  title: {
    marginTop: 20,
    color: '#b98955',
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    paddingHorizontal: 38,
  },
  description2: {
    color: '#b98955',
  },
})

class Interests extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    changeUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
  }

  interests = React.createRef()

  onDone = async () => {
    const { interests } = this.interests.current.state
    const categories = Object.keys(interests).map(Number)
    try {
      await http.post('/interests/user', { categories })
      await this.props.changeUser({ ...this.props.user, interests: true })
      this.props.navigation.dispatch(NavigationActions.back())
    } catch (error) {
      console.error('Interest', error)
      alert('No se pudieron cargar tus intereses')
    }
  }

  render () {
    return (
      <Container gradient style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo.png')} />
        <Text style={styles.title}>Conozcámonos</Text>
        <Text style={styles.description}>
          Selecciona los temas que te gustaría aprender con <Text style={styles.description2}>Luces Beautiful</Text>
        </Text>
        <ListInterests ref={this.interests} categories={this.props.categories} />
        <ButtonCTA title='CONTINUAR' style={{ marginTop: 20 }} onPress={this.onDone} />
      </Container>
    )
  }
}
export default withCategories(withUser(Interests))
