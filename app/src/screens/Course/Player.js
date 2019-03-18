import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-native-youtube'
import { API_KEY } from 'react-native-dotenv'
import { StatusBar, Dimensions, Platform, PixelRatio, StyleSheet, View } from 'react-native'

import colors from '../../utils/colors'

class Player extends Component {
  static propTypes = {
    video: PropTypes.shape({
      youtubeId: PropTypes.string.isRequired,
    }),
  }

  state = {
    playerHack: 1,
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  onError = (event) => {
    // alert(`onError ${JSON.stringify(event.error)}`)
    this.setState({ error: event.error })
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

  onChangeState = (event) => {
    this.setStatusState(event.state)
  }

  setStatusState (stateName) {
    this.setState((state) => ({
      state: Object.assign({}, state.state, { [stateName]: true }),
    }))
  }

  render () {
    const { height } = Dimensions.get('window')
    const { playerHack } = this.state
    const { video } = this.props
    if (video) {
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
}

export default Player

const styles = StyleSheet.create({
  video: {
    alignSelf: 'stretch',
    backgroundColor: colors.black,
  },
})
