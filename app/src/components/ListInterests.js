import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import Interest from './Interest'

const Divider = (props) => {
  return (
    <View style={props.active ? styles.divider.active : styles.divider.inactive} />
  )
}

Divider.propTypes = {
  active: PropTypes.bool
}

class ListInterests extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired
  }

  state = {
    interests: {}
  }

  onPressCategory = (id) => {
    const { interests } = this.state
    this.setState({
      interests: {
        ...interests,
        [id]: !interests[id]
      }
    })
  }

  render () {
    const { categories } = this.props
    const { interests } = this.state
    const categoriesKeys = Object.keys(categories)

    return categoriesKeys.reduce((list, categoryKey, index) => {
      const category = categories[categoryKey]
      const last = categories[categoriesKeys[index - 1]]

      const checked = interests[category.id]

      if (last) {
        const active = !last.checked && !checked
        list.push(
          <Divider key={last.id.toString() + category.id.toString()} active={active} />
        )
      }

      list.push(
        <Interest key={category.id} {...category} checked={checked} onPress={this.onPressCategory} />
      )
      return list
    }, [])
  }
}

const styles = {
  divider: {
    active: {
      marginVertical: 5,
      height: 1,
      backgroundColor: '#252525',
      width: '100%'
    },
    inactive: {
      marginVertical: 5,
      height: 1,
      backgroundColor: 'transparent',
      width: '100%'
    }
  }
}

export default ListInterests
