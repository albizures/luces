import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { withUser } from '../components/UserContext'

// import http from '../utils/http'

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object
  }

  state = {
    videos: []
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
    }
  }

  render () {
    // const { videos } = this.state
    return (
      <View>
        <Text>Home</Text>
        {/* {videos.map(video => (
          <Text style={styles.instructions} key={video.id}>
            {video.name}
          </Text>
        ))} */}
      </View>
    )
  }
}

export default withUser(Home)
