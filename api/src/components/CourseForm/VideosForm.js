import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
// import notification from 'antd/lib/notification'
import getVideoId from 'get-video-id'

import UploadImage from '../UploadImage'

import api from '../../utils/api'

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

class VideosForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  state = {}
  onBlurLink = async (e) => {
    const { id, service } = getVideoId(e.target.value)

    if (!id && service !== 'youtube') {
      e.preventDefault()
      this.setState({
        invalidUrl: true
      })
      return
    }

    const { data } = await api.youtube.getData(id)

    this.setState({
      data,
      imageList: [{
        uid: 1,
        status: 'done',
        url: data.thumbnail_url,
        thumbUrl: data.thumbnail_url,
        download: true
      }]
    })

    this.props.form.setFieldsValue({
      name: data.title
    })
  }
  transformUrl (value) {
    const { id, service } = getVideoId(value)
    if (!id && service !== 'youtube') {
      return
    }
    return id
  }

  cleanValues (values) {
    const { id } = getVideoId(values.link)
    return Object.assign(values, {
      id,
      author: this.state.data.author_name,
      image: values.image[0]
    })
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        return console.error(err)
      }

      values = this.cleanValues(values)
      if (this.props.video) {
      //   this.editCourse(this.props.course.id, {
      //     name: values.name
      //   })
      } else {
        this.props.onSubmit(values)
      }
      this.props.form.resetFields()
    })
  }

  render () {
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem {...formItemLayout} label='Link'>
          {getFieldDecorator('link', {
            rules: [{ required: true, transform: this.transformUrl }]
          })(
            <Input onBlur={this.onBlurLink} placeholder='Ingrese el link del video' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='Nombre'>
          {getFieldDecorator('name', {
            rules: [{ required: true }]
          })(
            <Input placeholder='Nombre del video' />
          )}
        </FormItem>
        <UploadImage
          {...formItemLayout}
          imageList={this.state.imageList}
          label='Imagen'
          name='image'
          form={form} />
        <FormItem {...formItemLayout} label='Descripcion'>
          {getFieldDecorator('description', {
            rules: [{ required: true }]
          })(
            <TextArea rows={4} placeholder='Descripcion del video' />
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span }}>
          <Button style={{float: 'left'}} type='primary' htmlType='submit'>
            Agregar
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(VideosForm)
