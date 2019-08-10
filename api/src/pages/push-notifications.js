import React from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import { Row, Col } from 'antd/lib/grid'
import AutoComplete from 'antd/lib/auto-complete'
import notification from 'antd/lib/notification'

import Layout from '../components/Layout'
import coursesMessages from '../messages/courses'
import notificationsMessages from '../messages/notifications'
import api from '../utils/api'

const { Item: FormItem } = Form

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
}

class PushNotifications extends React.Component {
  constructor () {
    super()

    this.state = {
      videosSearch: []
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

  sendNotification = (data) => {
    api.notifications.send(data).then(() => {
      notification.success(notificationsMessages.sent)
      this.props.form.resetFields()
    }).catch(error => {
      console.error(error)
      notification.error(notificationsMessages.failSent)
    })
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        return console.error(err)
      }

      console.log(values)

      values.courseId = this.state.courseId
      this.sendNotification(values)
    })
  }

  handleSearch = (value) => {
    api.courses.search(value).then(({ data }) => {
      data = Array.isArray(data) ? data : []

      const videosSearch = data.map((course) => ({
        text: course.name,
        value: course.id
      }))

      this.setState({
        videosSearch
      })
    }).catch(error => {
      console.error(error)
      notification.error(coursesMessages.failSearch)
    })
  }

  render () {
    const { videosSearch } = this.state
    const { form } = this.props
    const { getFieldDecorator } = form
    const content = (
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Form onSubmit={this.onSubmit}>
              <FormItem {...formItemLayout} label='Titulo'>
                {getFieldDecorator('title', {
                  rules: [{ required: true }]
                })(
                  <Input placeholder='Titulo' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Subtitulo'>
                {getFieldDecorator('body', {
                  rules: [{ required: true }]
                })(
                  <Input placeholder='Subtitulo' />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label='Curso'>
                {getFieldDecorator('course', {
                  rules: [{ required: false }]
                })(
                  <AutoComplete
                    dataSource={videosSearch}
                    onSelect={value => this.setState({ courseId: value })}
                    onSearch={this.handleSearch}
                    placeholder='Curso'
                  />
                )}
              </FormItem>
              <FormItem wrapperCol={{ span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span }}>
                <Button style={{ float: 'left' }} type='primary' htmlType='submit'>
                  Enviar notificacion
                </Button>
                <Button style={{ float: 'right' }} onClick={this.onCancel}>
                  Cancelar
                </Button>
              </FormItem>
            </Form>
          </div>
        </Col>
      </Row>
    )

    return (
      <Layout content={content} />
    )
  }
}
export default Form.create()(PushNotifications)
