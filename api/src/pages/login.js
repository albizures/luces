import React, { Component, Fragment } from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Card from 'antd/lib/card'
import Icon from 'antd/lib/icon'
import {Row, Col} from 'antd/lib/grid'
import Alert from 'antd/lib/alert'
import Head from 'next/head'

import api from '../utils/api'

const { Item: FormItem } = Form

const expiryDate = new Date()

expiryDate.setMonth(expiryDate.getMonth() + 1)

class Login extends Component {
  state = {}
  onSubmit = (evt) => {
    evt.preventDefault()
    this.setState({
      disabled: true
    })
    this.props.form.validateFields((err, values) => {
      if (err) {
        return console.error(err)
      }
      api.login(values.email, values.password)
        .then(({ data: { token } }) => {
          document.cookie = `id_token=${token}; expires=${expiryDate.toGMTString()}`
          document.location.pathname = '/'
        })
        .catch(() => {
          this.setState({
            disabled: false,
            wrongPassword: true
          })
          this.props.form.resetFields()
        })
    })
  }
  render () {
    const { disabled, wrongPassword } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <Fragment>
        <Head>
          <link rel='stylesheet' href='https://unpkg.com/antd@3/dist/antd.min.css' />
        </Head>
        <Row style={{marginTop: 200}}>
          <Col span={6} offset={9}>
            <Card>
              <Form onSubmit={this.onSubmit} className='login-form'>
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Ingrese el email!' }]
                  })(
                    <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Email' />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Ingrese la contraseña!' }]
                  })(
                    <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Contraseña' />
                  )}
                </FormItem>
                <FormItem>
                  <Button type='primary' htmlType='submit' disabled={disabled} className='login-form-button'>
                    Ingresar
                  </Button>
                  {wrongPassword && <Alert style={{marginTop: 10}} message='Informacion incorrecta' type='error' />}
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default Form.create()(Login)
