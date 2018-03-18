import React, { Component, Fragment } from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import List from 'antd/lib/list'
import getVideoId from 'get-video-id'

import api from '../utils/api'

const { Item } = List
const { Option } = Select
const { TextArea } = Input
const { Meta } = Item

const { Item: FormItem } = Form

const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 20 }
  }
}

class CourseForm extends Component {
  state = {
    videos: [],
    videosData: {}
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        return console.error(err)
      }

      if (this.props.category) {
        this.editCategory(this.props.category.id, {
          name: values.name
        })
      } else {
        this.addCategory(values)
      }
    })
  }

  onAddVideo = async (evt) => {
    const { videos, videosData } = this.state
    const { id, service } = getVideoId(this.newVideo.input.value)
    const { data } = await api.youtube.getData(id)

    if (id && !videos.includes(id) && service === 'youtube') {
      this.setState({
        videos: videos.concat(id),
        videosData: {
          ...videosData,
          [id]: data
        }
      })
    }
  }

  getItemAction () {
    return [
      <Icon type='up' />,
      <Icon type='down' />,
      <Icon type='close' />
    ]
  }
  getItemExtra (data) {
    return (
      <img width={272} alt='thumbnail' src={data.thumbnail_url} />
    )
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
    const { categories } = this.props
    const { getFieldDecorator } = this.props.form
    return <Form onSubmit={this.onSubmit}>
      <FormItem {...formItemLayout} label='Nombre'>
        {getFieldDecorator('name', {
          rules: [{ required: true }]
        })(
          <Input placeholder='Nombre del curso' />
        )}
      </FormItem>
      <FormItem {...formItemLayout} label='Categorias'>
        {getFieldDecorator('category', {
          rules: [{ required: true }]
        })(
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='categorias del curso'>
            {categories.map(category => (
              <Option key={category.id}>{category.name}</Option>
            ))}
          </Select>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label='Descripcion'>
        {getFieldDecorator('description', {
          rules: [{ required: true }]
        })(
          <TextArea rows={4} placeholder='Descripcion del curso' />
        )}
      </FormItem>
      <div className='ant-row ant-form-item'>
        <div className='ant-form-item-label ant-col-xs-4 ant-col-sm-4'>
          <label htmlFor='name' title='Videos'>Videos</label>
        </div>
        <div className='ant-form-item-control-wrapper ant-col-xs-20 ant-col-sm-20'>
          <span className='ant-input-search ant-input-search-enter-button ant-input-affix-wrapper'>
            <Input ref={(ref) => { this.newVideo = ref }} placeholder='Ingrese el link o id del video' />
            <span className='ant-input-suffix'>
              <Button type='primary' onClick={this.onAddVideo}>
                <Icon type='plus' />
              </Button>
            </span>
          </span>
          <br />
          <br />
          <List
            bordered
            itemLayout='vertical'
            dataSource={this.state.videos}
            renderItem={this.getListItem} />
        </div>
      </div>
    </Form>
  }
}

export default Form.create()(CourseForm)
