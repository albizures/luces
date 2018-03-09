import React, { Component } from 'react'
import PropTypes from 'prop-types'
import notification from 'antd/lib/notification'

export default class Remove extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
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
      .then(this.props.update)
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
      <button onClick={this.onClick}>
        Eliminar
      </button>
    )
  }
}
