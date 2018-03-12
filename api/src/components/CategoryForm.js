import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import notification from 'antd/lib/notification'
import messages from '../messages/categories'

import axios from 'axios'

const { Item: FormItem } = Form

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
}

const route = '/categories/'

class CategoriesForm extends Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    category: PropTypes.object
  }

  addCategory (data) {
    axios.post(route, data).then(() => {
      notification.success(messages.added)
      this.props.form.resetFields()
      this.props.onUpdate()
    }).catch(error => {
      console.error(error)
      notification.error(messages.addError)
    })
  }

  editCategory (id, data) {
    axios.put(route + id, data).then(() => {
      notification.success(messages.edited)
      this.props.form.resetFields()
      this.props.onUpdate(/* shouldUnselecte */ true)
    }).catch(error => {
      console.error(error)

      notification.error(messages.editError)
    })
  }

  componentWillReceiveProps (props) {
    if (props.category && (props.category !== this.props.category)) {
      this.props.form.setFieldsValue({
        name: props.category.name
      })
    }
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

  onCancel = () => {
    this.props.cancelEdit()
    this.props.form.resetFields()
  }

  render () {
    const { form, category } = this.props
    const { getFieldDecorator } = form
    return <Form onSubmit={this.onSubmit}>
      <FormItem {...formItemLayout} label='Nombre'>
        {getFieldDecorator('name', {
          rules: [{ required: true }]
        })(
          <Input placeholder='Nombre de la categoria' />
        )}
      </FormItem>
      <FormItem wrapperCol={{ span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span }}>
        <Button style={{float: 'left'}} type='primary' htmlType='submit'>
          {category ? 'Editar' : 'Agregar'}
        </Button>
        {category && (
          <Button style={{float: 'right'}} onClick={this.onCancel}>
            Cancelar
          </Button>
        )}
      </FormItem>
    </Form>
  }
}

export default Form.create()(CategoriesForm)
