import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import List from 'antd/lib/list'
import Divider from 'antd/lib/divider'
import Upload from 'antd/lib/upload'
import notification from 'antd/lib/notification'
import getVideoId from 'get-video-id'

import messages from '../messages/categories'
import api from '../utils/api'

const { Item } = List
const { Option } = Select
const { TextArea } = Input
const { Meta } = Item

const { Item: FormItem } = Form

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
}

class CourseForm extends Component {
  static propTypes = {
    course: PropTypes.object
  }

  state = {
    videos: [],
    videosData: {}
  }

  addCourse (data) {
    api.courses.post({
      ...data,
      image: data.image[0].url
    }).then(() => {
      notification.success(messages.added)
      this.props.form.resetFields()
      this.props.onUpdate()
    }).catch(error => {
      console.error(error)
      notification.error(messages.addError)
    })
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

  onSubmit = (evt) => {
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        return console.error(err)
      }
      if (this.props.category) {
      //   this.editCourse(this.props.course.id, {
      //     name: values.name
      //   })
      } else {
        this.addCourse(values)
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

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  onChange = (info) => {
    const fileList = info.fileList.slice(-1).map((file) => {
      // read from response and show file link
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url
      }
      return file
    })

    this.props.form.setFieldsValue({
      image: fileList
    })

    this.setState({
      imageList: fileList
    })
  }

  render () {
    const { categories, course } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    return <Fragment>
      <Form onSubmit={this.onSubmit}>
        <FormItem {...formItemLayout} label='Nombre'>
          {getFieldDecorator('name', {
            rules: [{ required: true }]
          })(
            <Input placeholder='Nombre del curso' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='Categoria'>
          {getFieldDecorator('category', {
            rules: [{ required: true }]
          })(
            <Select
              style={{ width: '100%' }}
              placeholder='Categoria del curso'>
              {categories.map(category => (
                <Option value={category.id} key={category.id}>{category.name}</Option>
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
        <FormItem
          {...formItemLayout}
          label='Imagen'>
          {getFieldDecorator('image', {
            getValueFromEvent: this.normFile,
            rules: [{ required: true }]
          })(
            <Upload onChange={this.onChange} name='logo' fileList={this.state.imageList} action='/api/courses/image' listType='picture'>
              <Button>
                <Icon type='upload' /> Click para subir
              </Button>
            </Upload>
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span }}>
          <Button style={{float: 'left'}} type='primary' htmlType='submit'>
            {course ? 'Editar' : 'Agregar'}
          </Button>
          {course && (
            <Button style={{float: 'right'}} onClick={this.onCancel}>
              Cancelar
            </Button>
          )}
        </FormItem>
        <div className='ant-col-xs-20 ant-col-sm-20 ant-col-offset-4'>
          <Divider>Videos</Divider>
        </div>
      </Form>
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
    </Fragment>
  }
}

export default Form.create()(CourseForm)
