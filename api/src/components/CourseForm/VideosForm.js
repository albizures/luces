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
    onSubmit: PropTypes.func.isRequired,
    video: PropTypes.object
  }

  state = {}

  componentWillReceiveProps (props) {
    if (props.video && (props.video !== this.props.video)) {
      this.props.form.setFieldsValue({
        link: `https://www.youtube.com/watch?v=${props.video.id}`,
        name: props.video.name,
        description: props.video.description,
        image: [{
          uid: 1,
          status: 'done',
          url: props.video.image.url,
          thumbUrl: props.video.image.url
        }]
      })
    }
  }

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

  normalizeValues (values) {
    const { id } = getVideoId(values.link)
    let author
    if (this.state.data) {
      author = this.state.data.author_name
    } else if (this.props.video) {
      author = this.props.video.author
    }
    return Object.assign(values, {
      id,
      author,
      image: values.image[0]
    })
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    this.props.form.validateFields((err, values) => {
      if (err) {
        return console.error(err)
      }

      values = this.normalizeValues(values)
      this.props.onSubmit(values)
      this.props.form.resetFields()
    })
  }

  render () {
    const { form, video } = this.props
    const { getFieldDecorator } = form
    return (
      <div>
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
          <Button style={{float: 'left'}} type='primary' onClick={this.onSubmit}>
            {video ? 'Guardar video' : 'Agregar video'}
          </Button>
          {video && (
            <Button style={{float: 'right'}} onClick={this.onCancel}>
              Cancelar
            </Button>
          )}
        </FormItem>
      </div>
    )
  }
}

export default Form.create()(VideosForm)
