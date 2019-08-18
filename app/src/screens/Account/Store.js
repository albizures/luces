import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../../utils/colors'

// const onPress = () => ({})

const Store = ({ title, address, schedules }) => {
  return (
    // <TouchableHighlight style={styles.touchable} onPress={onPress}>
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.address}>{address}</Text>
      <View style={styles.schedules}>
        {schedules.map(({ schedule, description }, index) => (
          <View style={styles.scheduleContainer} key={index}>
            <Text style={styles.description}>{description}: </Text>
            <Text style={styles.schedule}>{schedule}</Text>
          </View>
        ))}
      </View>
    </View>
    // </TouchableHighlight>
  )
}

Store.propTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  schedules: PropTypes.array.isRequired,
}

export default Store

const styles = StyleSheet.create({
  touchable: {

  },
  container: {
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  title: {
    flex: 1,
    color: colors.silver,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  address: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.darkTan,
    marginBottom: 10,
  },
  schedules: {
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.silver,
  },
  schedule: {
    fontSize: 14,
    color: colors.silver,
  },
  scheduleContainer: {
    flex: 1,
    flexDirection: 'row',
  },
})
