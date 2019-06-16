import { LoginManager, AccessToken } from 'react-native-fbsdk'
import assert from 'assert'
import http, { instance } from './http'

const permissions = ['email', 'public_profile']

export const login = async (options) => {
  const { setLoaderStatus, goHome, changeUser } = options
  assert(setLoaderStatus, '`setLoaderStatus` is required')
  assert(goHome, '`goHome` is required')
  assert(changeUser, '`changeUser` is required')

  setLoaderStatus(true)
  try {
    const { isCancelled } = await LoginManager.logInWithReadPermissions(permissions)
    if (isCancelled) {
      throw new Error('Login cancelled')
    }
    const { accessToken } = await AccessToken.getCurrentAccessToken()

    const { data: { token, user } } = await http.login(accessToken.toString())

    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token

    const { id_user: userId } = user
    const { data: interests } = await http.get('interests/user')
    await changeUser({
      ...user,
      userId,
      interests: Array.isArray(interests) && interests.length > 0,
      token,
    })
    goHome()
  } catch (error) {
    console.error('facebook login', error)
    alert(error.message)
    setLoaderStatus(false)
  }
}
