import { View, Text, Dimensions, TouchableWithoutFeedback, Image, StyleSheet, TouchableHighlight, Share, Platform } from 'react-native'
import { TabView } from 'react-native-tab-view'
import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import PropTypes from 'prop-types'
import Modal from '@albizures/react-native-modal'
import FitImage from 'react-native-fit-image'

import colors from '../../utils/colors'
import http from '../../utils/http'
import Container from '../../components/Container'
import TopBar from '../../components/TopBar'
import { withUser } from '../../components/UserContext'
import Comments from './Comments'
import FavoriteButton from './FavoriteButton'
import CommentBox from './CommentBox'
import Player from './Player'
import Videos from './Videos'
import { Provider as CourseContextProvider } from './CourseContext'

import { getTabBar, link, moreThanOneVideoConfig, oneVideoConfig, renderPager, userRequiredAlert } from './utils'

const { width } = Dimensions.get('window')

const iconShare = Platform.OS === 'ios'
  ? require('../../assets/share_ios.png')
  : require('../../assets/share_android.png')

const initialLayout = {
  height: 0,
  width,
}

class Course extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object,
  }

  state = {
    course: {},
    videos: [],
    comments: [],
    index: 0,
    routes: oneVideoConfig,
  }

  constructor (props) {
    super(props)

    this.userRequiredAlert = userRequiredAlert(this.onCreateAccount)
  }

  onIndexChange = index => this.setState({ index });

  async componentDidMount () {
    const { navigation } = this.props
    const { id } = navigation.getParam('course')
    this.setState({ isLoading: true })
    try {
      const [
        { data: course },
        { data: videos },
        { data: comments = [] },
      ] = await Promise.all([
        http.get(`courses/${id}`),
        http.get(`courses/${id}/videos`),
        http.get(`courses/${id}/comments`),
      ])

      this.setState({
        course,
        videos,
        comments,
        selectedVideo: 0,
        routes: videos.length > 1 ? moreThanOneVideoConfig : oneVideoConfig,
      })
    } catch (error) {
      console.error(error)
      alert('No se pudo carga el curso')
    }

    this.setState({ isLoading: false })
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
      return this.userRequiredAlert({
        title: '¿Quiere guardar tus cursos favoritos?',
        subtitle: 'Crea tu cuenta gratuita de Luces Beautiful para poder guardar tus cursos.',
      })
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
      console.error(error)
      alert('No se pudo agregar a favoritos')
    }
  }

  focusTextInput = (itComments, addSubComment) => {
    const { user } = this.props
    if (!user) {
      return this.userRequiredAlert({
        title: '¿Quieres ser parte de la comunidad?',
        subtitle: 'Crea tu cuenta gratuita de Luces Beautiful para poder comentar',
      })
    }

    this.setState({
      withFocus: true,
      addSubComment,
      itComments,
    })
  }

  onBlurTextInput = () => {
    this.setState({
      withFocus: false,
      addSubComment: undefined,
      itComments: undefined,
    })
  }

  renderScene = ({ route }) => {
    const { selectedVideo, videos } = this.state

    switch (route.key) {
    case 'comments':
      return <Comments />
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

  onBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  addComment = (comment) => {
    const { comments, addSubComment } = this.state

    if (addSubComment) {
      this.setState({
        withFocus: false,
        addSubComment: undefined,
        itComments: undefined,
      }, () => {
        addSubComment(comment)
      })
      return
    }

    this.setState({
      withFocus: false,
      comments: [comment].concat(comments),
    })
  }

  onCloseModal = () => {
    const { onModalClose } = this.state
    this.setState({
      image: undefined,
      isModalVisible: false,
      onModalClose: undefined,
    }, onModalClose)
  }

  componentWillUnmount () {
    this.onCloseModal()
  }

  expandImage = (config) => {
    const { image, onModalClose } = config

    this.setState({
      image,
      isModalVisible: true,
      onModalClose: onModalClose,
    })

    return () => {
      this.setState({
        image: undefined,
        isModalVisible: false,
        onModalClose: undefined,
      })
    }
  }

  render () {
    const {
      isLoading,
      course,
      withFocus,
      selectedVideo,
      videos,
      comments,
      isModalVisible,
      image,
      onModalClose,
      itComments,
    } = this.state
    const { name, favorite } = course
    const shareText = `Descarga Luces Beautiful app y aprende como yo con clases gratuitas! ${link}`
    const share = (
      <View style={styles.share}>
        <FavoriteButton title='Guardar' isFavorite={!!favorite} onPress={this.toggleFavorite} />
        <TouchableHighlight
          onPress={() => Share.share({
            message: shareText,
            title: 'Luces Beautiful App',
          })}
          elevation={10}
          style={{ marginRight: 25 }}>
          <Image source={iconShare} style={styles.icon} resizeMode='contain' />
        </TouchableHighlight>
      </View>
    )
    const { id } = course

    let video

    if (Number.isInteger(selectedVideo)) {
      video = videos[selectedVideo]
    }

    const keyboardChildren = withFocus ? (<CommentBox />) : null

    const commentsContext = {
      video,
      userRequiredAlert: this.userRequiredAlert,
      focusTextInput: this.focusTextInput,
      comments,
      courseId: id,
      addComment: this.addComment,
      onBlurTextInput: this.onBlurTextInput,
      expandImage: this.expandImage,
      itComments,
    }

    const imageModal = (
      <Modal
        avoidKeyboard
        isVisible={isModalVisible}
        onBackdropPress={this.onCloseModal}
        onSwipeComplete={this.onCloseModal}
        backdropOpacity={0.9}
        swipeDirection='down'>
        <TouchableWithoutFeedback onPress={this.onCloseModal}>
          <View onPress={this.onCloseModal} style={{ flex: 1, position: 'relative', alignContent: 'center', justifyContent: 'center', marginVertical: 30 }}>
            {Boolean(onModalClose) && (
              <Image style={{ position: 'absolute', right: 0, top: -20, height: 14, width: 14 }} source={require('../../assets/close.png')} />
            )}
            {Boolean(image) && (
              <TouchableWithoutFeedback activeOpacity={1}>{/* this stop propagation */}
                <FitImage source={image} />
              </TouchableWithoutFeedback>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )

    return (
      <CourseContextProvider value={commentsContext}>
        <Container modal={imageModal} scroll isLoading={isLoading} style={{ flex: 1 }} keyboardChildren={keyboardChildren}>
          <TopBar text='Video' modal onBack={this.onBack} share={share} />
          <Player video={video} />
          <View style={styles.container2}>
            <Text style={styles.title}>{name}</Text>
            {/* <Heart style={styles.like} active={!!favorite} onPress={this.toggleFavorite} /> */}
          </View>
          <TabView
            style={{ flex: 1 }}
            navigationState={this.state}
            renderScene={this.renderScene}
            renderTabBar={getTabBar}
            renderPager={renderPager}
            onIndexChange={this.onIndexChange}
            initialLayout={initialLayout} />
        </Container>
      </CourseContextProvider>
    )
  }
}

const styles = StyleSheet.create({
  share: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  like: {
    marginTop: 5,
    width: 20,
    height: 20,
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
  icon: {
    width: 25,
    height: 32,
  },
})

export default withUser(Course)
