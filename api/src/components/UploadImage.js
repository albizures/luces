import React from 'react'
import PropTypes from 'prop-types'
import Upload from 'antd/lib/upload'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'

import api from '../utils/api'

const { Item: FormItem } = Form

export default class UploadImage extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired
  }

  state = {
    imageList: this.props.imageList
  }

  onChange = (info) => {
    const fileList = info.fileList.slice(-1).map((file) => {
      // read from response and show file link
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url
      }
      return file
    })

    if (info.fileList.length > 1 && info.fileList[0].url) {
      api.images.del(info.fileList[0].url)
    }

    this.props.form.setFieldsValue({
      [this.props.name]: fileList
    })

    this.setState({
      imageList: fileList
    })
  }

  render () {
    const { name, form } = this.props
    const { getFieldDecorator } = form

    return (
      <FormItem
        {...this.props} >
        {getFieldDecorator(name, {
          getValueFromEvent: this.normFile,
          rules: [{ required: true }]
        })(
          <Upload onChange={this.onChange} name='logo' fileList={this.state.imageList} action='/api/images' listType='picture'>
            <Button>
              <Icon type='upload' /> Click para subir
            </Button>
          </Upload>
        )}
      </FormItem>
    )
  }
}
