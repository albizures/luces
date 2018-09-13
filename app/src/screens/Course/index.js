import { View, Text, Dimensions, Platform } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'
import React, { Component, PureComponent } from 'react'
import { NavigationActions } from 'react-navigation'
import YouTube from 'react-native-youtube'
import PropTypes from 'prop-types'
import { API_KEY } from 'react-native-dotenv'

import colors from '../../utils/colors'
import createUrl from '../../utils/createUrl'
import http from '../../utils/http'
import Heart from '../../components/Heart'
import Container from '../../components/Container'
import TopBar from '../../components/TopBar'
import CardCourse from '../../components/Course'
import Comments from './Comments'

const { width } = Dimensions.get('window')

const initialLayout = {
  height: 0,
  width
}

class Videos extends PureComponent {
  static propTypes = {
    videos: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  render () {
    const { videos } = this.props
    return <View style={{padding: 20}}>
      {videos.map((video, index) => (
        <CardCourse
          key={video.id}
          id={video.id}
          onPress={() => this.props.onSelect(index)}
          image={{uri: createUrl(video.url)}}
          title={video.name}
          description={video.description} />
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
    course: {},
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
    const { id } = navigation.getParam('course')
    this.setState({ isLoading: true })
    try {
      const { data: course } = await http.get(`courses/${id}`)
      const { data: videos } = await http.get(`courses/${id}/videos`)
      this.setState({
        course,
        isLoading: false,
        videos,
        selectedVideo: 0,
        routes: videos.length > 1 ? moreThanOneVideoConfig : oneVideoConfig
      })
    } catch (error) {
      console.log(error)
      alert('No se pudo carga el curso')
    }
  }

  onSelect = (index) => {
    this.setState({
      selectedVideo: index
    })
  }

  toggleFavorite = async () => {
    const { course } = this.state
    const { id, favorite } = course
    this.setState({ isLoading: true })
    try {
      if (favorite) {
        await http.del(`favorites/${id}`)
        this.setState({
          course: Object.assign({}, course, { favorite: false })
        })
      } else {
        await http.post('favorites', { id })
        this.setState({
          course: Object.assign({}, course, { favorite: true })
        })
      }
      this.setState({ isLoading: false })
    } catch (error) {
      console.log(error)
      alert('No se pudo agregar a favoritos')
    }
  }

  renderScene = ({ route }) => {
    const { selectedVideo, videos, course } = this.state
    const { id } = course

    switch (route.key) {
      case 'comments':
        return <Comments courseId={id} />
      case 'description':
        if (!Number.isInteger(selectedVideo)) {
          return null
        }
        const video = videos[selectedVideo]

        return (
          <View style={{padding: 20}}>
            <Text style={{color: colors.whiteTwo, fontSize: 14}}>{video.description}</Text>
          </View>
        )
      case 'videos':
        return <Videos videos={videos} onSelect={this.onSelect} />
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
          apiKey={API_KEY}
          controls={Platform.OS === 'ios' ? 1 : 1}
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
    const { isLoading } = this.state
    const { name, favorite } = this.state.course

    return (
      <Container isLoading={isLoading}>
        <TopBar text='Video' modal onBack={this.onBack} />
        {this.getPlayer()}
        <View style={styles.container2}>
          <Text style={styles.title}>{name}</Text>
          <Heart style={styles.like} active={!!favorite} onPress={this.toggleFavorite} />
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
  like: {
    marginTop: 5,
    width: 20,
    height: 20
  },
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}
