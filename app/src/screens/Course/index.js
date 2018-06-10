import { View, Text, Dimensions, Image, TouchableHighlight, Platform } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'
import React, { Component, PureComponent } from 'react'
import { NavigationActions } from 'react-navigation'
import YouTube from 'react-native-youtube'
import PropTypes from 'prop-types'

import colors from '../../utils/colors'
import http from '../../utils/http'
import FavoritesButton from '../../components/FavoritesButton'
import Container from '../../components/Container'
import CardCourse from '../../components/Course'
import Comments from './Comments'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width
}

class Videos extends PureComponent {
  static propTypes = {
    videos: PropTypes.array.isRequired
  }

  render () {
    const { videos } = this.props
    return <View style={{padding: 20}}>
      {videos.map(video => (
        <CardCourse key={video.id} image={{uri: video.url}} title={video.name} description={video.description} />
      ))}
    </View>
  }
}

const moreThanOneVideoConfig = [
  { key: 'comments', title: 'Comentarios' },
  { key: 'videos', title: 'Videos' },
  { key: 'description', title: 'Descripción' }
]
const oneVideoConfig = [
  { key: 'comments', title: 'Comentarios' },
  { key: 'description', title: 'Descripción' }
]

export default class Course extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    videos: [],
    index: 0,
    routes: oneVideoConfig
  }

  onIndexChange = index => this.setState({ index });

  renderLabel = (scene) => {
    const label = scene.route.title
    return <Text style={[styles.label, {color: scene.focused ? colors.darkTan : colors.gunmetal}]} >{label}</Text>
  }

  getTabBar = (props) => {
    return <TabBar
      {...props}
      pressOpacity={1}
      renderLabel={this.renderLabel}
      // getLabelText={({ route }) => route.title}
      labelStyle={styles.label}
      indicatorStyle={styles.indicator}
      style={styles.header} />
  }

  async componentDidMount () {
    const { navigation } = this.props
    const course = navigation.getParam('course')
    this.setState({ isLoading: true })
    try {
      const { data: videos } = await http.get(`courses/${course.id}/videos`)
      this.setState({
        isLoading: false,
        videos,
        selectedVideo: 0,
        routes: videos.length > 1 ? moreThanOneVideoConfig : oneVideoConfig
      })
    } catch (error) {
      alert('No se pudieron cargar los videos')
    }
  }

  renderScene = ({ route }) => {
    const { navigation } = this.props
    const { description, id } = navigation.getParam('course')

    switch (route.key) {
      case 'comments':
        return <Comments courseId={id} />
      case 'description':
        return (
          <View style={{padding: 20}}>
            <Text style={{color: colors.whiteTwo, fontSize: 14}}>{description}</Text>
          </View>
        )
      case 'videos':
        const { videos } = this.state
        return <Videos videos={videos} />
      default:
        return null
    }
  };

  onBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  getPlayer () {
    const { selectedVideo, videos } = this.state
    if (Number.isInteger(selectedVideo)) {
      const video = videos[selectedVideo]
      return (
        <YouTube
          videoId={video.youtubeId}
          play={false}
          controls={Platform.OS === 'ios' ? 1 : 2}
          loop={false}
          rel={false}
          showinfo={false}
          modestbranding={false}
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={styles.video} />
      )
    } else {
      return <View style={styles.video} />
    }
  }

  render () {
    const { navigation } = this.props
    const { name } = navigation.getParam('course')
    const { isLoading } = this.state
    return (
      <Container isLoading={isLoading}>
        {this.getPlayer()}
        <TouchableHighlight style={styles.backContainer} onPress={this.onBack}>
          <Image style={styles.back} source={require('../../assets/video_back.png')} />
        </TouchableHighlight>
        <View style={styles.container2}>
          <Text style={styles.title}>{name}</Text>
          <FavoritesButton />
        </View>
        <TabView
          style={{flex: 1}}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={this.getTabBar}
          onIndexChange={this.onIndexChange}
          initialLayout={initialLayout} />
      </Container>
    )
  }
}

const styles = {
  video: {
    alignSelf: 'stretch',
    height: 224,
    backgroundColor: colors.black
  },
  backContainer: {
    position: 'absolute',
    top: 10,
    width: 36,
    height: 36,
    left: 10
  },
  back: {
    width: 36,
    height: 36
  },
  label: {
    // color: colors.darkTan,
    fontSize: 18,
    fontWeight: '500'
  },
  indicator: {
    backgroundColor: colors.darkTan,
    height: 3
  },
  header: {
    backgroundColor: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.gunmetal
  },
  title: {
    fontSize: 24,
    color: colors.darkTan,
    fontWeight: 'bold'
  },
  container2: {
    paddingVertical: 28,
    paddingHorizontal: 20,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}
