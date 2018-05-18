import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-native-youtube'
import { NavigationActions } from 'react-navigation'
import { View, Text, Dimensions, Image, TouchableHighlight } from 'react-native'
import { TabViewAnimated, SceneMap, TabBar } from 'react-native-tab-view'

import colors from '../../utils/colors'
import FavoritesButton from '../../components/FavoritesButton'
import Container from '../../components/Container'
import Comments from './Comments'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width
}

export default class Course extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    index: 0,
    routes: [
      { key: 'comments', title: 'Comentarios' },
      { key: 'description', title: 'Descripción' }
    ]
  }

  onIndexChange = index => this.setState({ index });

  getDescription = () => {
    return <View style={{padding: 20}}>
      <Text style={{color: colors.whiteTwo, fontSize: 14}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum eum fuga dignissimos neque perferendis aut eius suscipit natus excepturi nemo hic iste quidem molestias debitis consequuntur eos, fugiat, ex voluptatibus?</Text>
    </View>
  }

  getComments = () => {
    return <Comments commentsCount={3} />
  }

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

  renderScene = SceneMap({
    comments: this.getComments,
    description: this.getDescription
  });

  onBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render () {
    return (
      <Container>
        <YouTube
          videoId='STWuPMcwwbw'
          play={false}
          loop={false}
          showinfo={false}
          modestbranding
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={styles.video} />
        <TouchableHighlight style={styles.backContainer} onPress={this.onBack}>
          <Image style={styles.back} source={require('../../assets/video_back.png')} />
        </TouchableHighlight>
        <View style={styles.container2}>
          <Text style={styles.title}>Curso Uñas</Text>
          <FavoritesButton />
        </View>
        <TabViewAnimated
          style={{flex: 1}}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.getTabBar}
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
