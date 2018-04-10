import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'

const styles = {
  checked: {
    container: {
      borderRadius: 25,
      backgroundColor: '#252525',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    icon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      margin: 5,
      backgroundColor: '#b98a56'
    },
    text: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#b98a56'
    },
    check: {
      borderWidth: 2,
      backgroundColor: '#b98a56',
      borderColor: '#b98a56',
      borderRadius: 12,
      height: 24,
      width: 24,
      margin: 13
    }
  },
  unchecked: {
    container: {
      backgroundColor: 'transparent',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    icon: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: 'transparent'
    },
    text: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#b98a56',
      marginLeft: 24
    },
    check: {
      borderWidth: 2,
      borderColor: '#b98a56',
      borderRadius: 12,
      height: 24,
      width: 24,
      margin: 13
    }
  }
}

export default class Interest extends Component {
  static defaultProps = {
    checked: false
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    checked: PropTypes.bool
  }

  render () {
    const style = this.props.checked ? styles.checked : styles.unchecked
    return (
      <View style={{height: 50, width: '100%'}}>
        <View style={style.container}>
          {/* <Image style={style.icon} source={require('../assets/300x300.png')} /> */}
          <View style={style.icon} />
          <Text style={style.text}>{this.props.text}</Text>
          <View style={style.check} />
        </View>
      </View>
    )
  }
}
