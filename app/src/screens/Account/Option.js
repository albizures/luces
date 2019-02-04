import React from 'react'
import { Image, TouchableHighlight, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../../utils/colors'

const Option = ({ title, icon, onPress }) => {
  return (
    <TouchableHighlight style={styles.touchable} onPress={onPress}>
      <View style={styles.container}>
        <Image source={icon} style={styles.optionIcon} />
        <Text style={styles.title}>{title}</Text>
        <Image style={styles.nextIcon} source={require('../../assets/next.png')} />
      </View>
    </TouchableHighlight>
  )
}

Option.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
}

const styles = {
  nextIcon: {
    width: 24,
    height: 24,
  },
  optionIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  title: {
    flex: 1,
    color: colors.whiteTwo,
    fontSize: 14,
    fontWeight: '500',
  },
  touchable: {
    width: '100%',
    height: 48,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
  },
}

export default Option
