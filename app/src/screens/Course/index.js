import { View, Text, Dimensions, PixelRatio, Platform, StatusBar, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TabView, TabBar, PagerPan } from 'react-native-tab-view'
import React, { Component, PureComponent } from 'react'
import { NavigationActions } from 'react-navigation'
import YouTube from 'react-native-youtube'
import PropTypes from 'prop-types'
import { API_KEY } from 'react-native-dotenv'

import colors from '../../utils/colors'
import createUrl from '../../utils/createUrl'
import http from '../../utils/http'
import Container from '../../components/Container'
import TopBar from '../../components/TopBar'
import CardCourse from '../../components/Course'
import { withUser } from '../../components/UserContext'
import Comments from './Comments'
import FavoriteButton from './FavoriteButton'

const { width } = Dimensions.get('window')

const initialLayout = {
  height: 0,
  width,
}

const link = Platform.OS === 'ios'
  ? 'https://itunes.apple.com/us/app/luces-beautiful-app/id1449402928'
  : 'https://play.google.com/store/apps/details?id=com.luces.app'

class Videos extends PureComponent {
  static propTypes = {
    videos: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  render () {
    const { videos } = this.props
    return <View style={{ padding: 20 }}>
      {videos.map((video, index) => (
        <CardCourse
          key={video.id}
          id={video.id}
          onPress={() => this.props.onSelect(index)}
          image={{ uri: createUrl(video.url) }}
          title={video.name}
          description={video.description} />
      ))}
    </View>
  }
}

const moreThanOneVideoConfig = [
  { key: 'comments', title: 'Comentarios' },
  { key: 'videos', title: 'Videos' },
  { key: 'description', title: 'Descripción' },
]
const oneVideoConfig = [
  { key: 'comments', title: 'Comentarios' },
  { key: 'description', title: 'Descripción' },
]

class Course extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object,
  }

  state = {
    course: {},
    videos: [],
    index: 0,
    playerHack: 1,
    routes: oneVideoConfig,
  }

  onIndexChange = index => this.setState({ index });

  renderLabel = (scene) => {
    const label = scene.route.title
    return <Text style={[styles.label, { color: scene.focused ? colors.darkTan : colors.gunmetal }]} >{label}</Text>
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
        routes: videos.length > 1 ? moreThanOneVideoConfig : oneVideoConfig,
      })
    } catch (error) {
      console.log(error)
      alert('No se pudo carga el curso')
    }
  }

  onSelect = (index) => {
    this.setState({
      selectedVideo: index,
    })
  }

  onCreateAccount = () => {
    const { navigation } = this.props

    navigation.navigate('SignUp')
  }

  toggleFavorite = async () => {
    const { user } = this.props
    const { course } = this.state
    const { id, favorite } = course

    if (!user) {
      return Alert.alert(
        '¿Quiere guardar tus cursos favoritos?',
        'Crea tu cuenta gratuita de Luces Beautiful para poder guardar tus cursos.',
        [
          { text: 'Crear Cuenta', onPress: this.onCreateAccount },
          {
            text: 'Cancelar',
            style: 'cancel',
          },
        ],
        { cancelable: true },
      )
    }

    try {
      if (favorite) {
        await http.del(`favorites/${id}`)
        this.setState({
          course: Object.assign({}, course, { favorite: false }),
        })
      } else {
        await http.post('favorites', { id })
        this.setState({
          course: Object.assign({}, course, { favorite: true }),
        })
      }
      this.setState({ isLoading: false })
    } catch (error) {
      console.log(error)
      alert('No se pudo agregar a favoritos')
    }
  }

  renderScene = ({ route }) => {
    const { navigation } = this.props
    const { selectedVideo, videos, course } = this.state
    const { id } = course

    switch (route.key) {
    case 'comments':
      return <Comments navigation={navigation} courseId={id} scroll={this.scroll} />
    case 'description':
      if (!Number.isInteger(selectedVideo)) {
        return null
      }
      const video = videos[selectedVideo]

      return (
        <View style={{ padding: 20 }}>
          <Text style={{ color: colors.whiteTwo, fontSize: 14 }}>{video.description}</Text>
        </View>
      )
    case 'videos':
      return <Videos videos={videos} onSelect={this.onSelect} />
    default:
      return null
    }
  };

  onError = (event) => {
    console.log(event)
    // alert(`onError ${JSON.stringify(event.error)}`)
    this.setState({ error: event.error })
  }

  onChangeState = (event) => {
    this.setStatusState(event.state)
  }

  setStatusState (stateName) {
    this.setState((state) => ({
      state: Object.assign({}, state.state, { [stateName]: true }),
    }))
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  addTimeout () {
    const { lastTimeout = 200 } = this
    this.lastTimeout = lastTimeout * 1.5
    this.timeout = setTimeout(() => {
      this.setState((state) => ({
        playerHack: state.playerHack === 0 ? 1 : 0,
      }))
      this.addTimeout()
    }, this.lastTimeout)
  }

  onReady = () => {
    this.setStatusState('ready')
    if (Platform.OS === 'android') {
      this.addTimeout()
    }
  }

  onBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  getPlayer () {
    const { height } = Dimensions.get('window')
    const { selectedVideo, videos, playerHack } = this.state
    if (Number.isInteger(selectedVideo)) {
      const video = videos[selectedVideo]
      return (
        <YouTube
          videoId={video.youtubeId}
          play={false}
          apiKey={API_KEY}
          fullscreen={Platform.OS === 'ios'}
          controls={1}
          loop={false}
          rel={false}
          showinfo={false}
          onReady={this.onReady}
          onChangeState={this.onChangeState}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={this.onError}
          onChangeFullscreen={() => StatusBar.setHidden(false)}
          style={[
            { height: PixelRatio.roundToNearestPixel((height + playerHack) / (3 / 1)) },
            styles.video,
          ]} />
      )
    } else {
      return <View style={styles.video} />
    }
  }

  renderPager = props => (
    <PagerPan {...props} />
  );

  render () {
    const { isLoading, course } = this.state
    const { name, favorite } = course
    // const behavior = Platform.OS === 'ios' ? 'position' : undefined
    const shareText = `Descarga Luces Beautiful app y aprende como yo con clases gratuitas! ${link}`
    return (
      <Container scroll isLoading={isLoading} style={{ flex: 1 }}>
        <KeyboardAwareScrollView innerRef={ref => {
          this.scroll = ref
        }} >
          <TopBar text='Video' modal onBack={this.onBack} shareText={shareText} />
          {this.getPlayer()}
          <View style={styles.container2}>
            <Text style={styles.title}>{name}</Text>
            <FavoriteButton title='Guardar' isFavorite={!!favorite} onPress={this.toggleFavorite} />
            {/* <Heart style={styles.like} active={!!favorite} onPress={this.toggleFavorite} /> */}
          </View>
          <TabView
            style={{ flex: 1 }}
            navigationState={this.state}
            renderScene={this.renderScene}
            renderTabBar={this.getTabBar}
            renderPager={this.renderPager}
            onIndexChange={this.onIndexChange}
            initialLayout={initialLayout} />
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

const styles = {
  like: {
    marginTop: 5,
    width: 20,
    height: 20,
  },
  video: {
    alignSelf: 'stretch',
    backgroundColor: colors.black,
  },
  backContainer: {
    position: 'absolute',
    top: 10,
    width: 36,
    height: 36,
    left: 10,
  },
  back: {
    width: 36,
    height: 36,
  },
  label: {
    // color: colors.darkTan,
    fontSize: 18,
    fontWeight: '500',
  },
  indicator: {
    backgroundColor: colors.darkTan,
    height: 3,
  },
  header: {
    backgroundColor: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.gunmetal,
  },
  title: {
    fontSize: 24,
    color: colors.darkTan,
    fontWeight: 'bold',
    marginRight: 14,
  },
  container2: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}

export default withUser(Course)
