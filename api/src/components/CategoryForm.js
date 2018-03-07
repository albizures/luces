import React, { Component, Fragment } from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import notification from 'antd/lib/notification'

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

class CategoriesForm extends Component {
  async addCategory (data) {
    await axios.post('/categories', data)
  }
  onClick = (evt) => {
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        return console.error(err)
      }

      this.addCategory(values).then(() => notification.success({
        message: 'Categoria agregada',
        description: 'La categoria a sido agregada correctamente'
      })).then(() => {
        this.props.form.resetFields()
        this.props.onUpdate()
      }).catch(error => {
        console.error(error)

        notification.error({
          message: 'Error al agregar categoria',
          description: 'La categoria no pudo ser agregada, intentelo de nuevo'
        })
      })
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return <Fragment>
      <FormItem {...formItemLayout} label='Nombre'>
        {getFieldDecorator('name', {
          rules: [{ required: true }]
        })(
          <Input placeholder='Nombre de la categoria' />
        )}
      </FormItem>
      <FormItem wrapperCol={{ span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span }}>
        <Button onClick={this.onClick} type='primary' htmlType='submit'>
          Agregar
        </Button>
      </FormItem>
    </Fragment>
  }
}

export default Form.create()(CategoriesForm)
