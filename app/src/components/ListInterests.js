import React, { Fragment } from 'react'
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

const ListInterests = (props) => {
  const interests = props.interests.reduce((interests, interest, index) => {
    const last = props.interests[index - 1]

    if (last) {
      const active = !last.checked && !interest.checked
      interests.push(
        <Divider key={last.id.toString() + interest.id.toString()} active={active} />
      )
    }

    interests.push(
      <Interest key={interest.id} {...interest} />
    )
    return interests
  }, [])
  return (
    <Fragment>
      {interests}
    </Fragment>
  )
}

ListInterests.propTypes = {
  interests: PropTypes.array.isRequired
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
