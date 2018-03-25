import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import Button from 'antd/lib/button'
import Divider from 'antd/lib/divider'
import getVideoId from 'get-video-id'

import UploadImage from '../UploadImage'
import api from '../../utils/api'

const { Option } = Select
const { TextArea } = Input

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
    course: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
  }

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

      this.props.onSubmit(values).then(() => {
        this.props.form.resetFields()
      })
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

  render () {
    const { categories, course, form } = this.props
    const { getFieldDecorator } = form
    return (
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
        <UploadImage
          {...formItemLayout}
          label='Imagen'
          name='image'
          form={form} />
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
    )
  }
}

export default Form.create()(CourseForm)
