import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import List from 'antd/lib/list'
import notification from 'antd/lib/notification'
import Icon from 'antd/lib/icon'

import messages from '../../messages/categories'
import api from '../../utils/api'
import VideosForm from './VideosForm'
import CourseForm from './CourseForm'

const { Item } = List
const { Meta } = Item

const reduceVideos = (videos) => videos.reduce((result, video) => {
  result.videos.push(video.youtubeId)
  result.videosData[video.youtubeId] = {
    id: video.youtubeId,
    idVideo: video.id,
    image: {
      url: video.url
    },
    description: video.description,
    name: video.name
  }

  return result
}, { videos: [], videosData: {} })

export default class Course extends Component {
  static propTypes = {
    course: PropTypes.object,
    categories: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired
  }

  state = {
    videos: [],
    videosData: {}
  }

  async componentWillReceiveProps (props) {
    if (props.course && (props.course !== this.props.course)) {
      const { data: videos } = await api.courses.getVideos(props.course.id)
      const result = reduceVideos(videos)

      this.setState(result)
    }
  }

  getCourseData = (data, withVideos = false) => ({
    ...data,
    image: data.image.url,
    videos: withVideos ? this.state.videos.map((id) => this.state.videosData[id]) : undefined
  })

  async addCourse (data) {
    try {
      await api.courses.post(this.getCourseData(data, /* withVideos */ true))
    } catch (error) {
      console.error(error)
      notification.error(messages.addError)
      throw new Error(error)
    }

    notification.success(messages.added)
    this.cleanVideos()
    this.props.onUpdate()
  }

  async editCourse (id, data) {
    try {
      await api.courses.put(id, data)
    } catch (error) {
      console.error(error)
      notification.error(messages.editError)
      throw new Error(error)
    }

    notification.success(messages.edited)
    this.props.onUpdate(/* shouldUnselecte */ true)
  }

  onSubmitVideo = async (videoData) => {
    if (this.props.course) {
      const {data: videos} = await api.courses.putVideos(this.props.course.id, {
        videos: [videoData]
      })

      videoData.idVideo = videos[0]
    }
    const { id } = videoData

    this.setState({
      videos: this.state.videos.concat(id),
      videosData: {
        ...this.state.videosData,
        [id]: videoData
      }
    })
  }

  cleanVideos = () => {
    this.setState({
      videos: [],
      videosData: {}
    })
  }

  onSubmitCourse = async (course) => {
    if (this.props.course) {
      await this.editCourse(this.props.course.id, this.getCourseData(course))
    } else {
      await this.addCourse(course)
    }
    this.cleanVideos()
  }

  onRemoveVideo (id) {
    const videos = this.state.videos.filter(videoId => videoId !== id)
    const videosData = {
      ...this.state.videosData,
      [id]: undefined
    }
    this.setState({
      videos,
      videosData
    })
  }

  getItemAction (id) {
    return [
      <Icon type='up' />,
      <Icon type='down' />,
      <Icon type='close' onClick={() => this.onRemoveVideo(id)} />
    ]
  }

  getItemExtra (data) {
    return (
      <img width={272} alt='thumbnail' src={data.image.url} />
    )
  }

  getListItem = (id) => {
    const video = this.state.videosData[id]
    return (
      <Item
        extra={this.getItemExtra(video)}
        actions={this.getItemAction(id)}>
        <Meta
          avatar={<Fragment />}
          title={<a href={'https://www.youtube.com/watch?v=' + video.id}>{video.name}</a>}
          description={video.author} />
      </Item>
    )
  }

  courseCancelEdit = () => {
    this.props.cancelEdit()
    this.cleanVideos()
  }

  render () {
    const { categories, course } = this.props
    return (
      <Fragment>
        <CourseForm onSubmit={this.onSubmitCourse} course={course} categories={categories} cancelEdit={this.courseCancelEdit} />
        <VideosForm onSubmit={this.onSubmitVideo} />
        <div className='ant-row ant-form-item'>
          <div className='ant-col-offset-4 ant-col-xs-20 ant-col-sm-20'>
            <br />
            <br />
            <List
              bordered
              itemLayout='vertical'
              dataSource={this.state.videos}
              renderItem={this.getListItem} />
          </div>
        </div>
      </Fragment>
    )
  }
}
