import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import Container from '../../components/Container'
import Store from './Store'
import TopBar from '../../components/TopBar'

const stores = [
  {
    title: 'Luces Beautiful Central',
    address: '19 calle 1-30 zona 3',
    schedules: [{
      description: 'Lunes a viernes',
      schedule: '10:00 am a 6:30 pm',
    }, {
      description: 'Sábado',
      schedule: '9:00 am a 7:00 pm',
    }, {
      description: 'Domingo',
      schedule: '10:00 am a 4:00 pm',
    }],
  },
  {
    title: 'Hair & Nails',
    address: '19 calle 1-18 zona 3',
    schedules: [{
      description: 'Lunes a viernes',
      schedule: '10:00 am a 6:30 pm',
    }, {
      description: 'Sábado',
      schedule: '9:00 am a 7:00 pm',
    }, {
      description: 'Domingo',
      schedule: '10:00 am a 3:30 pm',
    }],
  },
  {
    title: 'Luces Beautiful Paseo la Sexta',
    address: '6ta avenida 15-71 zona 1',
    schedules: [{
      description: 'Lunes a viernes',
      schedule: '10:00am a 7:00 pm',
    }, {
      description: 'Sábado',
      schedule: '9:00 am a 7:00 pm',
    }, {
      description: 'Domingo',
      schedule: '10:00 am a 6:00 pm',
    }],
  },
  {
    title: 'Luces Beautiful Metronorte',
    address: 'Local 2-815, primer nivel',
    schedules: [{
      description: 'Lunes a viernes',
      schedule: '10:30 am a 7:00 pm',
    }, {
      description: 'Sábado',
      schedule: '10:00 am a 8:00 pm',
    }, {
      description: 'Domingo',
      schedule: '10:30 am a 7:00 pm',
    }],
  },
  {
    title: 'Luces Beautiful Eskala',
    address: 'Local 117 y 118, frente al Parqueo de la Roosevelt',
    schedules: [{
      description: 'Lunes a viernes',
      schedule: '10:30 am a 7:00 pm',
    }, {
      description: 'Sábado',
      schedule: '10:00 am a 8:00 pm',
    }, {
      description: 'Domingo',
      schedule: '10:30 am a 7:00 pm',
    }],
  },
]

export default class Stores extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    const topBar = (
      <TopBar
        onBack={this.onBack}
        text='Tiendas Oficiales' />
    )
    return (
      <Container
        style={{ flex: 1 }}
        scroll
        gradient
        topBar={topBar}>
        <View style={styles.storesContainer}>
          {stores.map((store, index) => {
            return (
              <Store key={index} {...store} />
            )
          })}
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  storesContainer: {
    marginHorizontal: 16,
    paddingTop: 20,
  },
})
