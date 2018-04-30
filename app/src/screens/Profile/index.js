import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ElevatedView from 'react-native-elevated-view'

import colors from '../../utils/colors'

import TabIcon from '../../components/TabIcon'
import Container from '../../components/Container'
import TopBar from '../../components/TopBar'
import CircleImage from '../../components/CircleImage'
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
      <Container>
        <LinearGradient colors={colors.blackGradientBackground} style={styles.gradient}>
          <TopBar
            onBack={this.onBack}
            icon={require('../../assets/account.png')}
            text='Mi perfil' />
          <ScrollView>
            <View style={styles.profile}>
              <ElevatedView style={{height: 130, width: 130, borderRadius: 65}} elevation={2}>
                <CircleImage size={130} style={styles.photo} source={require('../../assets/300x300.png')} />
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
          </ScrollView>
        </LinearGradient>
      </Container>
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
    marginBottom: 20
  },
  profile: {
    paddingTop: 30,
    alignItems: 'center'
  },
  gradient: {
    flex: 1
  }
}
