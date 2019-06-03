import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import Button from 'antd/lib/button'
import Divider from 'antd/lib/divider'
import notification from 'antd/lib/notification'
import difference from 'lodash.difference'

import UploadImage from '../UploadImage'
import api from '../../utils/api'
import messages from '../../messages/courses'

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

const mapSubcategoriesChanges = (add) => (id_subcategory) => ({ add, id_subcategory })

class CourseForm extends Component {
  static propTypes = {
    course: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    videos: PropTypes.array.isRequired
  }

  state = {
    subcategories: []
  }

  async componentWillReceiveProps (props) {
    if (props && props.course && (props.course !== this.props.course)) {
      const { name, idCategory, description, image } = props.course
      const { data: courseSubcategories } = await api.courses.getSubcategories(props.course.id)
      const { data: subcategories } = await api.categories.getSubcategories(idCategory)
      this.setState({ subcategories })
      this.props.form.setFieldsValue({
        name,
        category: idCategory,
        description,
        subcategories: courseSubcategories,
        image: [{
          uid: 1,
          status: 'done',
          url: image,
          thumbUrl: image
        }]
      })
    }
  }

  onCancel = () => {
    this.props.cancelEdit()
    this.props.form.resetFields()
  }

  cleanValues (values) {
    return Object.assign(values, {
      image: values.image[0]
    })
  }

  async getSubcategories (category) {
    try {
      const { data: subcategories } = await api.categories.getSubcategories(category)
      this.setState({ subcategories })
      this.props.form.setFieldsValue({
        subcategory: []
      })
    } catch (error) {
      console.log(error)
      notification.error(messages.getSubcategories)
    }
  }

  onChangeCategory = (value) => {
    this.getSubcategories(value)
  }

  onChangeSubcategories = (subcategories) => {
    const { course } = this.props
    if (!course) {
      return
    }

    const currentSubcategories = this.props.form.getFieldValue('subcategories')
    const removedSubcategories = difference(currentSubcategories, subcategories)
      .map(mapSubcategoriesChanges(false))
    const addedSubcategories = difference(subcategories, currentSubcategories)
      .map(mapSubcategoriesChanges(true))

    api.courses.putSubcategories(course.id, addedSubcategories.concat(removedSubcategories))
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        return console.error(err)
      }

      values = this.cleanValues(values)
      this.props.onSubmit(values).then(() => {
        this.props.form.resetFields()
      })
    })
  }

  render () {
    const { subcategories } = this.state
    const { categories, course, form, children, videos } = this.props
    const { getFieldDecorator } = form
    return (
      <Form onSubmit={this.onSubmit}>
        <div className='ant-col-xs-20 ant-col-sm-20 ant-col-offset-4'>
          <Divider>Curso</Divider>
        </div>
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
              onChange={this.onChangeCategory}
              placeholder='Categoria del curso'>
              {categories.map(category => (
                <Option value={category.id} key={category.id}>{category.name}</Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='Subcategoria'>
          {getFieldDecorator('subcategories', {
            rules: [{ required: false }]
          })(
            <Select
              mode='multiple'
              disabled={subcategories.length === 0}
              style={{ width: '100%' }}
              onChange={this.onChangeSubcategories}
              placeholder='Categoria del curso'>
              {subcategories.map(subcategory => (
                <Option value={subcategory.id} key={subcategory.id}>{subcategory.name}</Option>
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
        <FormItem {...formItemLayout} label='Autor'>
          {getFieldDecorator('author', {
            rules: [{ required: true }]
          })(
            <Input placeholder='Autor del curso' />
          )}
        </FormItem>
        <UploadImage
          {...formItemLayout}
          label='Imagen'
          name='image'
          form={form} />
        <div className='ant-col-xs-20 ant-col-sm-20 ant-col-offset-4'>
          <Divider>Videos</Divider>
        </div>
        {/* <div className='ant-row ant-form-item'>
          <div className='ant-col-offset-4 ant-col-xs-20 ant-col-sm-20'> */}
        {children}
        {/* </div>
        </div> */}
        <FormItem wrapperCol={{ span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span }}>
          <Button style={{ float: 'left' }} type='primary' htmlType='submit' disabled={!videos.length}>
            {course ? 'Guardar curso' : 'Agregar curso'}
          </Button>
          {course && (
            <Button style={{ float: 'right' }} onClick={this.onCancel}>
              Cancelar
            </Button>
          )}
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(CourseForm)
