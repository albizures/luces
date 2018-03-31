import React, { Component } from 'react'
import PropTypes from 'prop-types'
import notification from 'antd/lib/notification'
import Button from 'antd/lib/button'

import { showDeleteConfirm } from '../utils/delete'

export default class Remove extends Component {
  static propTypes = {
    onRemove: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  }
  onClick = async () => {
    const confirm = await showDeleteConfirm()
    if (!confirm) {
      return
    }

    try {
      await this.props.delete(this.props.id)
      notification.success({
        message: 'Eliminado',
        description: 'Registro eleminado'
      })
      this.props.onRemove()
    } catch (error) {
      console.error(error)
      notification.error({
        message: 'Error',
        description: 'No se pudo eliminar'
      })
    }
  }

  render () {
    return (
      <Button type='danger' size='small' onClick={this.onClick}>
        Eliminar
      </Button>
    )
  }
}
