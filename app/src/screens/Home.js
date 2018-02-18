import React, { Component } from 'react';
import { View, Text } from 'react-native';

import http from '../utils/http'

class Home extends Component {
  state = {
    videos: []
  }

  componentDidMount = async () => {
    try {
      const {data: videos} = await http.get('videos')
      console.log('response vi', videos)

      this.setState({loading: false, videos})
    } catch (e) {
      console.log(e);
      this.setState({loading: false, error: true})
    }
  }
  render() {
    const { videos } = this.state
    return (
      <View>
        <Text>Home</Text>
        {videos.map(video => (
          <Text style={styles.instructions} key={video.id}>
            {video.name}
          </Text>
        ))}
      </View>
    );
  }
}

export default {
  Component: Home,
  screen: 'Home',
  icon: require('../assets/icon2.png'),
  selectedIcon: require('../assets/icon2_selected.png'),
  title: 'Home'
}