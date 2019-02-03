import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput as RNTextInput, StyleSheet, ViewPropTypes, View, Text } from 'react-native'

import colors from '../utils/colors'

class TextInput extends Component {
  static propTypes = {
    mask: PropTypes.bool,
    style: ViewPropTypes.style,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)

    const { mask } = this.props

    this.state = {
      masked: mask,
    }
  }

  state = {
    masked: true,
  }

  onChange = (value) => {
    const { name, onChange } = this.props
    onChange({ name, value })
  }

  onPress = () => {
    this.setState({ masked: !this.state.masked })
  }

  render () {
    const { mask, style } = this.props
    const { masked } = this.state

    return (
      <View style={styles.container}>
        <RNTextInput onChangeText={(value) => this.onChange(value)} {...this.props} secureTextEntry={masked} style={[styles.input, style]} placeholderTextColor={colors.slateGrey} />
        {mask && <Text onPress={this.onPress} style={styles.show}>{masked ? 'Mostrar' : 'Ocultar' }</Text>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  show: {
    color: colors.white,
    position: 'absolute',
    right: 0,
    bottom: 15,
  },
  input: {
    paddingTop: 20,
    paddingBottom: 15,
    color: colors.white,
    textAlign: 'left',
    backgroundColor: 'transparent',
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    height: 60,
    width: '100%',
  },
})

export default TextInput
