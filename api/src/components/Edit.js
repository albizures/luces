import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'antd/lib/button'

export default class Edit extends Component {
  static propTypes = {
    edit: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  onClick = () => {
    this.props.edit(this.props.data)
  }

  render () {
    return (
      <Button type='dashed' size='small' onClick={this.onClick}>
        Editar
      </Button>
    )
  }
}
