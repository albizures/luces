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

export default class Course extends Component {
  static propTypes = {
    course: PropTypes.object,
    categories: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  state = {
    videos: [],
    videosData: {}
  }

  async addCourse (data) {
    try {
      await api.courses.post({
        ...data,
        image: data.image.fileList[0].url
      })
    } catch (error) {
      console.error(error)
      notification.error(messages.addError)
      throw new Error(error)
    }

    notification.success(messages.added)
    this.props.onUpdate()
  }

  editCourse (id, data) {
    api.courses.put(id, data).then(() => {
      notification.success(messages.edited)
      this.props.form.resetFields()
      this.props.onUpdate(/* shouldUnselecte */ true)
    }).catch(error => {
      console.error(error)

      notification.error(messages.editError)
    })
  }

  onSubmitVideo = (videoData) => {
    const { id } = videoData

    this.setState({
      videos: this.state.videos.concat(id),
      videosData: {
        ...videoData,
        [id]: videoData
      }
    })
  }

  onSubmitCourse = async (course) => {
    if (this.props.category) {
      //   this.editCourse(this.props.course.id, {
      //     name: values.name
      //   })
    } else {
      await this.addCourse(course)
    }
  }

  onRemoveVideo (id) {
    const videos = this.state.videos.filter(videoId => videoId !== id)
    const videosData = Object.assign({}, this.state.videosData, { [id]: undefined })
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

  render () {
    return (
      <Fragment>
        <CourseForm onSubmit={this.onSubmitCourse} categories={this.props.categories} />
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
