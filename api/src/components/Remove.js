import React, { Component } from 'react'
import PropTypes from 'prop-types'
import notification from 'antd/lib/notification'
import Button from 'antd/lib/button'

export default class Remove extends Component {
  static propTypes = {
    onRemove: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  }
  onClick = () => {
    this.props.delete(this.props.id)
      .then(() => {
        notification.success({
          message: 'Eliminado',
          description: 'Registro eleminado'
        })
      })
      .then(this.props.onRemove)
      .catch(error => {
        console.error(error)
        notification.error({
          message: 'Error',
          description: 'No se pudo registrar'
        })
      })
  }

  render () {
    return (
      <Button type='danger' size='small' onClick={this.onClick}>
        Eliminar
      </Button>
    )
  }
}
