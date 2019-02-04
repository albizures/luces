import React from 'react'
import { View, ViewPropTypes, TouchableHighlight, Text, Image } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../../utils/colors'

const Subcategory = (props) => {
  const { subcategory, style } = props
  return (
    <TouchableHighlight {...props} onPress={() => props.onPress(subcategory)} style={[style, styles.touchable]}>
      <View style={styles.container}>
        <View style={styles.text}>
          <Text style={styles.title} numberOfLines={1}>{subcategory.name}</Text>
        </View>
        <Image style={styles.arrow} source={require('../../assets/next.png')} />
      </View>
    </TouchableHighlight>
  )
}

Subcategory.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  subcategory: PropTypes.object.isRequired,
}

const styles = {
  touchable: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: colors.darkTan,
    fontWeight: 'bold',
  },
  arrow: {
    width: 12,
    height: 24,
    marginRight: 5,
  },
}

export default Subcategory
