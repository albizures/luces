import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import http from './utils/http'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  state = {
    videos: []
  }

  componentDidMount = async () => {
    try {
      const {data: videos} = await http.get('videos')
      // let videos = await response.json()

      // videos = videos ? videos : [];
      console.log('response vi', videos)

      this.setState({loading: false, videos})
    } catch (e) {
      console.log(e);
      this.setState({loading: false, error: true})
    }
  }

  render() {
    const { videos } = this.state
    console.log('reder ', videos)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        {videos.map(video => (
          <Text style={styles.instructions} key={video.id}>
            {video.name}
          </Text>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
