import React from 'react'
import { View, ViewPropTypes, TouchableHighlight, Text } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../../utils/colors'
import CircleImage from '../../components/CircleImage'

const Category = (props) => {
  const { category, style, icon, last } = props
  return (
    <TouchableHighlight {...props} onPress={() => props.onPress(category)} style={[style, styles.touchable]}>
      <View style={styles.container}>
        <CircleImage size={30} source={icon} style={styles.icon} />
        <View style={[styles.text, {borderBottomWidth: last ? 0 : 1}]}>
          <Text style={styles.title} numberOfLines={1}>{category.name.toUpperCase()}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

Category.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
  category: PropTypes.object.isRequired,
  last: PropTypes.bool.isRequired
}

const styles = {
  touchable: {
    flex: 1,
    width: '100%'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    marginRight: 14
  },
  text: {
    flex: 1,
    marginTop: 9,
    marginBottom: 9,
    borderBottomColor: colors.silver
    // borderBottomWidth: 1
  },
  title: {
    fontSize: 14,
    color: colors.whiteTwo,
    fontWeight: '500'
  },
  icon: {
    marginRight: 15,
    backgroundColor: colors.darkTan
  },
  arrow: {
    width: 12,
    height: 24,
    marginRight: 5
  }
}

export default Category
