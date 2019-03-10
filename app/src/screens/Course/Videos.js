import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import createUrl from '../../utils/createUrl'
import CardCourse from '../../components/Course'

export default class Videos extends PureComponent {
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
