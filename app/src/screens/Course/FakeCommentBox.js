import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native'

import colors from '../../utils/colors'

const FakeCommentBox = (props) => {
  const { style, onFocus } = props

  return (
    <View style={styles.container}>
      <Text {...props} onPress={onFocus} style={[styles.input].concat(style)}>
        Escribe un comentario…
      </Text>
    </View>
  )
}

FakeCommentBox.propTypes = {
  onFocus: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
}

export default FakeCommentBox

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gunmetal,
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    color: colors.whiteTwo,
    width: '100%',
  },
})
