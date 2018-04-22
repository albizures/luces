import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Image, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ElevatedView from 'react-native-elevated-view'

import colors from '../../utils/colors'

import TabIcon from '../../components/TabIcon'
import TopBar from '../../components/TopBar'
import Course from './Course'

export default class Profile extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  static navigationOptions = {
    title: 'Cuenta',
    tabBarIcon: ({focused}) => {
      return <TabIcon
        activeSrc={require('../../assets/tabs/account_active.png')}
        src={require('../../assets/tabs/account.png')}
        focused={focused} />
    }
  }

  onBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    return (
      <LinearGradient colors={colors.blackGradientBackground} style={styles.container}>
        <TopBar
          onBack={this.onBack}
          icon={require('../../assets/account.png')}
          text='Mi perfil' />
        <View style={styles.profile}>
          <ElevatedView elevation={2}>
            <Image style={styles.photo} source={require('../../assets/300x300.png')} />
          </ElevatedView>
          <Text style={styles.name}>Lorena Enriquez</Text>
          <Text style={styles.info}>Guatemala - 27 años</Text>
        </View>
        <View style={styles.courses}>
          <Text style={styles.coursesTitle}>Mis cursos</Text>
          <Course title='Ondas naturales en cabello' icon={require('../../assets/categories/hair.png')} />
          <Course title='Sombras de ojos nude' icon={require('../../assets/categories/eyes.png')} />
          <Course title='Curso de uñas' icon={require('../../assets/categories/nail.png')} />
        </View>
      </LinearGradient>
    )
  }
}

const styles = {
  coursesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.whiteTwo,
    marginBottom: 20
  },
  courses: {
    width: '100%',
    paddingTop: 50,
    paddingHorizontal: 20,
    flex: 1
  },
  name: {
    fontSize: 24,
    color: colors.darkTan,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 14,
    color: colors.slateGrey,
    fontWeight: '500'
  },
  photo: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20
  },
  profile: {
    paddingTop: 30,
    alignItems: 'center'
  },
  container: {
    backgroundColor: colors.black,
    flex: 1
  }
}
