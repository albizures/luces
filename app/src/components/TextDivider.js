import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import colors from '../utils/colors'

const TextDivider = ({ children, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.divider, styles.section]} />
      <View styles={styles.section}>
        <Text onPress={onPress} style={styles.text}>{children}</Text>
      </View>
      <View style={[styles.divider, styles.section]} />
    </View>
  )
}

TextDivider.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
}

const styles = StyleSheet.create({
  text: {
    color: colors.slateGrey,
    fontSize: 16,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    flex: 1,
  },
  divider: {
    marginHorizontal: 11,
    height: 1,
    borderWidth: 0,
    backgroundColor: colors.gunmetal,
    borderColor: colors.gunmetal,
  },
})

export default TextDivider
