import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import List from 'antd/lib/list'

import VideosForm from './VideosForm'
import CourseForm from './CourseForm'

const { Item } = List
const { Meta } = Item

export default class Course extends Component {
  static propTypes = {
    course: PropTypes.object,
    categories: PropTypes.array.isRequired
  }

  state = {
    videos: [],
    videosData: {}
  }

  getListItem = (id) => {
    const { videosData } = this.state
    const data = videosData[id]
    return (
      <Item
        extra={this.getItemExtra(data)}
        actions={this.getItemAction()}>
        <Meta
          avatar={<Fragment />}
          title={<a href={'https://www.youtube.com/watch?v=' + id}>{data.title}</a>}
          description={data.author_name} />
      </Item>
    )
  }

  render () {
    return (
      <Fragment>
        <CourseForm categories={this.props.categories} />
        <VideosForm />
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
