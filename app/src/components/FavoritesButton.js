import React from 'react'
import { TouchableHighlight, ViewPropTypes, Text, Image, View } from 'react-native'
import ElevatedView from 'react-native-elevated-view'

import colors from '../utils/colors'

const FavoritesButton = (props) => {
  return (
    <TouchableHighlight {...props} style={[props.style, styles.button]}>
      <ElevatedView style={styles.container} elevation={4}>
        <Text style={styles.text}>Agregar a favoritos</Text>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={require('../assets/account/heart.png')} />
        </View>
      </ElevatedView>
    </TouchableHighlight>
  )
}

FavoritesButton.propTypes = {
  style: ViewPropTypes.style
}

const styles = {
  iconContainer: {
    backgroundColor: colors.darkTan,
    height: 30,
    width: 30,
    padding: 5
  },
  icon: {
    backgroundColor: colors.darkTan,
    height: 20,
    width: 20
  },
  container: {
    backgroundColor: colors.black,
    height: 30,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.6
  },
  button: {
    height: 30,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    backgroundColor: '#b98a56',
    width: 150
  },
  text: {
    flex: 1,
    fontSize: 10,
    marginLeft: 5,
    color: colors.darkTan,
    fontWeight: 'bold'
  }
}

export default FavoritesButton
