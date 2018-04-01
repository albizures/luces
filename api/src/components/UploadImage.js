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
    form: PropTypes.object.isRequired,
    imageList: PropTypes.array
  }

  static defaultProps = {
    imageList: []
  }

  state = {
    imageList: this.props.imageList
  }

  componentWillReceiveProps (props) {
    if (props.imageList !== this.props.imageList) {
      this.props.form.setFieldsValue({
        [this.props.name]: props.imageList
      })
    }
  }

  normFile = (evt) => {
    const { fileList } = evt
    if (fileList.length > 1 && fileList[0].url) {
      api.images.del(fileList[0].url)
    }

    return evt && evt.fileList.slice(-1).map((file) => {
      file.name = ''
      // read from response and show file link
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url
      }
      return file
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
          valuePropName: 'fileList',
          initialValue: [],
          rules: [{ required: true }]
        })(
          <Upload className='upload-list-inline' name='logo' action='/api/images' listType='picture'>
            <Button>
              <Icon type='upload' /> Click para subir
            </Button>
          </Upload>
        )}
      </FormItem>
    )
  }
}