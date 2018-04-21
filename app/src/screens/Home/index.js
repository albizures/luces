import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { withUser } from '../../components/UserContext'
import TabIcon from '../../components/TabIcon'
import Highlight from './Highlight'
import Course from './Course'
import colors from '../../utils/colors'
// import http from '../utils/http'

const styles = {
  gradient: {
    flex: 1
  },
  header: {
    height: 65,
    width: '100%',
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5
  },
  headerLogo: {
    height: 35,
    resizeMode: Image.resizeMode.contain
  },
  highlights: {
    height: 50,
    marginHorizontal: 15,
    marginTop: 24
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 14,
    color: '#b98a56',
    fontWeight: '500'
  },
  courses: {
    backgroundColor: '#252525',
    paddingTop: 20,
    paddingHorizontal: 10,
    width: '100%',
    flex: 1
  },
  scrollView: {
    height: 222,
    paddingHorizontal: 15
  }
}

class Home extends Component {
  static navigationOptions = {
    title: 'Cursos',
    tabBarIcon: ({focused}) => {
      return <TabIcon
        activeSrc={require('../../assets/tabs/courses_active.png')}
        src={require('../../assets/tabs/courses.png')}
        focused={focused} />
    }
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object
  }

  state = {
    videos: [],
    enabled: true
  }

  componentDidMount = async () => {
    // Navigation.showModal({
    //   screen: 'Onboarding',
    //   title: 'Onboarding',
    //   animationType: 'slide-up',
    //   navigatorButtons: {}
    // })
    // try {
    //   const {data: videos} = await http.get('videos')
    //   console.log('response vi', videos)

    //   this.setState({loading: false, videos})
    // } catch (e) {
    //   console.log(e)
    //   this.setState({loading: false, error: true})
    // }

    if (!this.props.user) {
      this.props.navigation.navigate('Onboarding')
    } else {
      if (!this.props.user.interests) {
        this.props.navigation.navigate('Interests')
      }
    }
  }

  onTouchStart = () => {
    this.setState({ enabled: false })
  }

  onMomentumScrollEnd = () => {
    this.setState({ enabled: true })
  }

  onScrollEndDrag = () => {
    this.setState({ enabled: true })
  }

  onClickCourse = () => {
    this.props.navigation.navigate('HomeCourse')
  }

  render () {
    // const { videos } = this.state
    return (
      <LinearGradient colors={['#4c4c4c', '#252525']} style={styles.gradient}>
        <ScrollView
          style={{flex: 1}}
          scrollEnabled={this.state.enabled}
          onTouchStart={this.onTouchStart}
          onMomentumScrollEnd={this.onTouchStart}
          onScrollEndDrag={this.onScrollEndDrag}>
          <View style={styles.header}>
            <Image height={55} style={styles.headerLogo} source={require('../../assets/logo.png')} />
          </View>
          <View style={styles.highlights}>
            <Text style={styles.title}>Cursos Beautiful</Text>
            <Text style={styles.subTitle}>Destacados</Text>
          </View>
          <ScrollView horizontal style={styles.scrollView} >
            <Highlight title='Uñas' subTitle='Acrílicas Masglo' image={require('../../assets/300x300.png')} />
            <Highlight title='Uñas' subTitle='Acrílicas Masglo' image={require('../../assets/300x300.png')} />
            <Highlight title='Uñas' subTitle='Acrílicas Masglo' image={require('../../assets/300x300.png')} />
            <Highlight title='Uñas' subTitle='Acrílicas Masglo' image={require('../../assets/300x300.png')} />
          </ScrollView>
          <View style={styles.courses}>
            <Text style={[styles.title, {marginLeft: 20, marginBottom: 20}]}>Todos los cursos</Text>
            <Course icon={require('../../assets/categories/eyes_active.png')} onPress={this.onClickCourse} course={{name: 'Maquillaje de noche', author: 'Denise Gonzalez'}} />
            <Course icon={require('../../assets/categories/nail_active.png')} onPress={this.onClickCourse} course={{name: 'Maquillaje de noche', author: 'Denise Gonzalez'}} />
            <Course icon={require('../../assets/categories/hair_active.png')} onPress={this.onClickCourse} course={{name: 'Maquillaje de noche', author: 'Denise Gonzalez'}} />
            <Course icon={require('../../assets/categories/mask_active.png')} onPress={this.onClickCourse} course={{name: 'Maquillaje de noche', author: 'Denise Gonzalez'}} />
          </View>
        </ScrollView>
        {/* {videos.map(video => (
          <Text style={styles.instructions} key={video.id}>
            {video.name}
          </Text>
        ))} */}
      </LinearGradient>
    )
  }
}

export default withUser(Home)
