import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import List from 'antd/lib/list'
import notification from 'antd/lib/notification'
import Icon from 'antd/lib/icon'

import messages from '../../messages/courses'
import api from '../../utils/api'
import { showDeleteConfirm } from '../../utils/delete'
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
    name: video.name,
    order: video.order,
    author: video.author
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

  getVideosData = () => {
    return this.state.videos.map((id, index) => {
      return {
        ...this.state.videosData[id],
        order: index
      }
    })
  }

  getCourseData = (data, withVideos = false) => ({
    ...data,
    image: data.image.url,
    videos: withVideos ? this.getVideosData() : undefined
  })

  addCourse = async (data) => {
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

  editCourse = async (id, data) => {
    try {
      await api.courses.put(id, data)
    } catch (error) {
      console.error(error)
      notification.error(messages.editError)
      throw new Error(error)
    }

    notification.success(messages.edited)
    this.props.onUpdate(/* shouldUnselect */ true)
  }

  getLastOrder () {
    const lastVideo = this.state.videosData[this.state.videos[this.state.videos.length - 1]]
    return lastVideo.order + 1
  }

  onSubmitVideo = async (videoData) => {
    if (this.props.course) {
      if (this.state.selectedVideo) {
        await api.videos.put(
          this.state.videosData[this.state.selectedVideo].idVideo,
          videoData
        )
        videoData.idVideo = this.state.selectedVideo.idVideo

        notification.success(messages.videoEdited)
      } else {
        const {data: videos} = await api.courses.putVideos(this.props.course.id, [{
          ...videoData,
          order: this.getLastOrder()
        }])
        videoData.idVideo = videos[0]
      }
    }
    const { id } = videoData

    this.setState({
      videos: this.state.selectedVideo ? this.state.videos : this.state.videos.concat(id),
      videosData: {
        ...this.state.videosData,
        [id]: videoData
      },
      selectedVideo: undefined
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

  onRemoveVideo = async (id) => {
    const confirm = await showDeleteConfirm()
    if (!confirm) {
      return
    }

    if (this.props.course) {
      await api.courses.removeVideo(
        this.props.course.id,
        this.state.videosData[id].idVideo
      )
    }

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

  async swapVideos (firstIndex, secondIndex) {
    const firstVideo = this.state.videos[firstIndex]
    const secondVideo = this.state.videos[secondIndex]

    const videos = this.state.videos.slice()
    const firstVideoData = this.state.videosData[firstVideo]
    const secondVideoData = this.state.videosData[secondVideo]

    const video = videos[firstIndex]
    videos[firstIndex] = videos[secondIndex]
    videos[secondIndex] = video

    const videosData = {
      ...this.state.videosData,
      [firstVideo]: {
        ...firstVideoData,
        order: secondVideoData.order
      },
      [secondVideo]: {
        ...secondVideoData,
        order: firstVideoData.order
      }
    }

    const modifiedVideos = [
      videosData[firstVideo],
      videosData[secondVideo]
    ]

    try {
      if (this.props.course) {
        await api.courses.putVideosOrder(
          this.props.course.id,
          modifiedVideos
        )
      }
      this.setState({videos, videosData})
    } catch (error) {
      console.log(error)
      notification.error(messages.errorOrder)
    }
  }

  sendVideoUp (id) {
    const index = this.state.videos.indexOf(id)
    if (index === 0) {
      return
    }
    const newIndex = index - 1

    this.swapVideos(index, newIndex)
  }

  sendVideoDown (id) {
    const index = this.state.videos.indexOf(id)
    if (index === this.state.videos.length - 1) {
      return
    }
    const newIndex = index + 1

    this.swapVideos(index, newIndex)
  }

  getItemAction (id) {
    return [
      <Icon type='caret-up' onClick={() => this.sendVideoUp(id)} />,
      <Icon type='caret-down' onClick={() => this.sendVideoDown(id)} />,
      <Icon type='edit' onClick={() => this.selectVideo(id)} />,
      <Icon type='close' onClick={() => this.onRemoveVideo(id)} />
    ]
  }

  getItemExtra (data) {
    return (
      <img width={272} alt='thumbnail' src={data.image.url} />
    )
  }

  selectVideo (id) {
    this.setState({
      selectedVideo: id
    })
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
    const { selectedVideo, videosData, videos } = this.state
    const { categories, course } = this.props
    return (
      <Fragment>
        <CourseForm onSubmit={this.onSubmitCourse} videos={videos} course={course} categories={categories} cancelEdit={this.courseCancelEdit}>
          <div>
            <VideosForm onSubmit={this.onSubmitVideo} video={videosData[selectedVideo]} />
          </div>
          <div className='ant-row ant-form-item'>
            <div className='ant-col-offset-4 ant-col-xs-20 ant-col-sm-20'>
              <List
                bordered
                locale={{emptyText: 'No hay ningun video'}}
                itemLayout='vertical'
                dataSource={videos}
                renderItem={this.getListItem} />
            </div>
          </div>
        </CourseForm>
      </Fragment>
    )
  }
}
