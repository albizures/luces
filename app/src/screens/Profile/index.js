import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import ElevatedView from 'react-native-elevated-view'

import colors from '../../utils/colors'
import http from '../../utils/http'
import createUrl from '../../utils/createUrl'

import TabIcon from '../../components/TabIcon'
import Container from '../../components/Container'
import TopBar from '../../components/TopBar'
import CircleImage from '../../components/CircleImage'
import Course from '../../components/Course'

export default class Profile extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    title: 'Cuenta',
    tabBarIcon: ({ focused }) => {
      return <TabIcon
        activeSrc={require('../../assets/tabs/account_active.png')}
        src={require('../../assets/tabs/account.png')}
        focused={focused} />
    },
  }

  state = {
    loading: true,
    courses: [],
  }

  async componentDidMount () {
    try {
      const { data } = await http.get('login/me')
      const { data: courses = [] } = await http.get('favorites')

      this.setState({
        ...data,
        courses,
        loading: false,
      })
    } catch (error) {
      console.error(error)
    }
  }

  onBack = () => {
    this.props.navigation.goBack()
  }

  onClickCourse (course) {
    const { navigation } = this.props
    navigation.navigate('Course', { course })
  }

  render () {
    const { name, cover, loading, courses } = this.state
    const topBar = (
      <TopBar
        onBack={this.onBack}
        icon={require('../../assets/account.png')}
        text='Mi perfil' />
    )
    return (
      <Container gradient topBar={topBar} scroll loading={loading}>
        <View style={styles.profile}>
          <ElevatedView style={{ height: 130, width: 130, borderRadius: 65 }} elevation={2}>
            {cover && <CircleImage size={130} style={styles.photo} source={{ uri: createUrl(cover) }} />}
          </ElevatedView>
          <Text style={styles.name}>{name}</Text>
          {/* <Text style={styles.info}>Guatemala - 27 años</Text> */}
        </View>
        <View style={styles.courses}>
          <Text style={styles.coursesTitle}>Mis cursos</Text>
          {/* <Course title='Ondas naturales en cabello' icon={require('../../assets/categories/hair.png')} />
          <Course title='Sombras de ojos nude' icon={require('../../assets/categories/eyes.png')} />
          <Course title='Curso de uñas' icon={require('../../assets/categories/nail.png')} /> */}
          {courses.length === 0 && (
            <Text style={{ textAlign: 'center', fontSize: 14, color: colors.whiteTwo }}>Todavía no tienes ningún curso</Text>
          )}
          {courses.map((course) => {
            const { image, name, description, id } = course
            return (
              <Course
                key={id}
                image={{ uri: createUrl(image) }}
                title={name}
                description={description}
                onPress={() => this.onClickCourse(course)} />
            )
          })}
        </View>
      </Container>
    )
  }
}

const styles = {
  coursesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.whiteTwo,
    marginBottom: 20,
  },
  courses: {
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 20,
    flex: 1,
  },
  name: {
    fontSize: 24,
    color: colors.darkTan,
    marginBottom: 5,
    marginTop: 20,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: colors.slateGrey,
    fontWeight: '500',
  },
  photo: {
    marginBottom: 20,
  },
  profile: {
    paddingTop: 30,
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
  },
}
