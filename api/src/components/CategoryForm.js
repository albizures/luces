import React, { Component, Fragment } from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'

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
        <Button type='primary' htmlType='submit'>
          Agregar
        </Button>
      </FormItem>
    </Fragment>
  }
}

export default Form.create()(CourseForm)
