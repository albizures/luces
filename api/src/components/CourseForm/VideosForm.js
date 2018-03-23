import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
// import Icon from 'antd/lib/icon'
// import Upload from 'antd/lib/upload'
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
  onChangeLink = async (e) => {
    console.log(e.target.value)
    const { id, service } = getVideoId(this.newVideo.input.value)
    const { data } = await api.youtube.getData(id)
    console.log(data, service)
    this.props.form.setFieldsValue({
      name: 'test'
    })
  }

  onAddVideo = (evt) => {

  }

  render () {
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form onSubmit={this.onAddVideo}>
        <FormItem {...formItemLayout} label='Link'>
          {getFieldDecorator('Link', {
            rules: [{ required: true }]
          })(
            <Input onChange={this.onChangeLink} placeholder='Ingrese el link del video' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='Nombre'>
          {getFieldDecorator('videoName', {
            rules: [{ required: true }]
          })(
            <Input placeholder='Nombre del video' />
          )}
        </FormItem>
        <UploadImage
          {...formItemLayout}
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
