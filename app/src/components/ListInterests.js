import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import Interest from './Interest'
import http from '../utils/http'

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
    update: PropTypes.bool,
    categories: PropTypes.object.isRequired
  }

  state = {
    interests: {}
  }

  getInterests = async () => {
    try {
      const { data: interests } = await http.get('interests/user')
      this.setState({
        interests: interests.reduce((obj, interest) => Object.assign(obj, { [interest.category]: true }), {})
      })
    } catch (error) {
      console.log('ListInterests', error)
      alert('No se pudieron cargar los intereses')
    }
  }

  componentDidMount () {
    this.getInterests()
  }

  onPressCategory = async (id) => {
    const { update } = this.props
    const { interests } = this.state

    try {
      if (update) {
        await http.put('interests/user', [{ id_category: id, add: !interests[id] }])
      }

      this.setState({
        interests: {
          ...interests,
          [id]: !interests[id]
        }
      })
    } catch (error) {
      alert('No se puedo guardar')
      console.log(error)
    }
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
