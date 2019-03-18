import React from 'react'
import { Text, StyleSheet, Platform, Alert } from 'react-native'
import { TabBar, PagerPan } from 'react-native-tab-view'
import ImagePicker from 'react-native-image-picker'

import colors from '../../utils/colors'

export const renderLabel = (scene) => {
  const label = scene.route.title
  return <Text style={[styles.label, { color: scene.focused ? colors.darkTan : colors.gunmetal }]}>{label}</Text>
}

export const link = Platform.OS === 'ios'
  ? 'https://itunes.apple.com/us/app/luces-beautiful-app/id1449402928'
  : 'https://play.google.com/store/apps/details?id=com.luces.app'

export const moreThanOneVideoConfig = [
  { key: 'comments', title: 'Comentarios' },
  { key: 'videos', title: 'Videos' },
  { key: 'description', title: 'Descripción' },
]

export const oneVideoConfig = [
  { key: 'comments', title: 'Comentarios' },
  { key: 'description', title: 'Descripción' },
]

export const renderPager = props => (
  <PagerPan {...props} />
)

export const getTabBar = (props) => {
  return (
    <TabBar
      {...props}
      pressOpacity={1}
      renderLabel={renderLabel}
      labelStyle={styles.label}
      indicatorStyle={styles.indicator}
      style={styles.header} />
  )
}

export const userRequiredAlert = (defaultOnPress) => (options) => {
  const {
    title = '¿Quieres ser parte de la comunidad?',
    subtitle = 'Crea tu cuenta gratuita de Luces Beautiful.',
    onPress = defaultOnPress,
  } = options

  Alert.alert(
    title,
    subtitle,
    [
      { text: 'Crear Cuenta', onPress },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ],
    { cancelable: true },
  )
}

export const showPicker = () => new Promise((resolve, reject) => {
  ImagePicker.showImagePicker({}, (response) => {
    if (response.didCancel) {
      return reject(new Error('Cancelado'))
    }

    if (response.error) {
      reject(response.error)
    }

    const { uri, type, fileName: name } = response
    resolve({
      uri: Platform.OS === 'android'
        ? uri
        : uri.replace('file://', ''),
      type,
      name,
    })
  })
})

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
  indicator: {
    backgroundColor: colors.darkTan,
    height: 3,
  },
  header: {
    backgroundColor: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.gunmetal,
  },
})
