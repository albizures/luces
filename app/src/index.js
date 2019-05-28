
import React, { Component } from 'react'

import { StatusBar, View, AsyncStorage, Alert } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import firebase from 'react-native-firebase'

// import './config'

import Onboarding from './screens/Onboarding'
import Interests from './screens/Interests'
import Home from './screens/Home'
import HomeCourse from './screens/HomeCourse'
import Favorites from './screens/Favorites'
import Search from './screens/Search'
import Account from './screens/Account'
import Profile from './screens/Profile'
import Notifications from './screens/Notifications'
import InterestsAccount from './screens/InterestsAccount'
import Course from './screens/Course'
import Courses from './screens/Courses'
import Category from './screens/Category'
import Subcategory from './screens/Subcategory'
import AppLoader from './screens/AppLoader'
import LoginAccount from './screens/LoginAccount'
import SignUp from './screens/SignUp'
import ForgotPassword from './screens/ForgotPassword'
import ChangePassword from './screens/ChangePassword'

import { Provider as UserProvider, getValue } from './components/UserContext'
import { Provider as CategoryProvider } from './components/CategoriesContext'
import { instance } from './utils/http'
import { tabBarIcon } from './components/TabIcon'

const prefix = 'lucesbeautiful://'

const OnboardingStack = createStackNavigator({
  Onboarding: {
    screen: Onboarding,
  },
}, {
  headerMode: 'none',
  initialRouteName: 'Onboarding',
})

const AccountStack = createStackNavigator({
  HomeAccount: {
    screen: Account,
  },
  Profile: {
    screen: Profile,
  },
  Notifications: {
    screen: Notifications,
  },
  InterestsAccount: {
    screen: InterestsAccount,
  },
}, {
  headerMode: 'none',
  initialRouteName: 'HomeAccount',
})

AccountStack.navigationOptions = {
  title: 'Cuenta',
  tabBarIcon: tabBarIcon({
    active: require('./assets/tabs/account_active.png'),
    inactive: require('./assets/tabs/account.png'),
  }),
}

const CoursesStack = createStackNavigator({
  HomeCourses: {
    screen: Home,
  },
  Courses: {
    screen: Courses,
  },
  Category: {
    screen: Category,
  },
  Subcategory: {
    screen: Subcategory,
  },
}, {
  initialRouteName: 'HomeCourses',
  headerMode: 'none',
})

CoursesStack.navigationOptions = {
  title: 'Cursos',
  tabBarIcon: tabBarIcon({
    active: require('./assets/tabs/courses_active.png'),
    inactive: require('./assets/tabs/courses.png'),
  }),
}

const MainTab = createBottomTabNavigator({
  Home: {
    screen: CoursesStack,
  },
  Favorites: {
    screen: Favorites,
  },
  Search: {
    screen: Search,
  },
  Account: {
    screen: AccountStack,
  },
}, {
  initialRouteName: 'Home',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#b98a56',
    inactiveTintColor: '#656767',
    style: {
      backgroundColor: '#252525',
      borderTopWidth: 1,
      borderTopColor: '#656767',
    },
  },
  animationEnabled: true,
  swipeEnabled: true,
})

const AppStack = createStackNavigator({
  Interests: {
    screen: Interests,
  },
  Main: {
    screen: MainTab,
  },
  Course: {
    screen: Course,
  },
  HomeCourse: {
    screen: HomeCourse,
  },
  LoginAccount,
  SignUp,
  ForgotPassword,
}, {
  mode: 'modal',
  initialRouteName: 'Main',
  headerMode: 'none',
})

const RootStack = createSwitchNavigator({
  Onboarding: {
    screen: OnboardingStack,
  },
  AppLoader: {
    screen: AppLoader,
  },
  App: {
    screen: AppStack,
  },
  ChangePassword: {
    screen: ChangePassword,
    path: 'change-password/:token',
  },
}, {
  initialRouteName: 'AppLoader',
})

export default class App extends Component {
  rootStackRef = React.createRef()

  state = {
    categories: {},
    // user: { interests: false }
  }

  onLogout = async () => {
    await AsyncStorage.clear()
    this.setState({ user: null })
  }

  onChangeUser = async (user) => {
    const { token, userId, interests } = user || {}

    if (token) {
      await AsyncStorage.setItem('token', token)
    } else {
      await AsyncStorage.removeItem('token')
    }

    if (userId) {
      await AsyncStorage.setItem('userId', userId.toString())
    } else {
      await AsyncStorage.removeItem('userId')
    }

    if (interests) {
      await AsyncStorage.setItem('interests', 'true')
    } else {
      await AsyncStorage.removeItem('interests')
    }

    this.setState({ user })
  }

  setCategories = (categories) => {
    this.setState({ categories })
  }

  async componentDidMount () {
    this.checkPermission()
    this.createNotificationListeners()
  }

  componentWillUnmount () {
    this.notificationListener()
    this.notificationOpenedListener()
  }

  async createNotificationListeners () {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification
      this.showAlert(title, body)
    })

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification
      this.showAlert(title, body)
    })

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification()
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification
      this.showAlert(title, body)
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      // process data message
      console.log(JSON.stringify(message))
    })
  }

  showAlert (title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    )
  }

  async checkPermission () {
    const enabled = await firebase.messaging().hasPermission()
    if (enabled) {
      this.getToken()
    } else {
      this.requestPermission()
    }
  }

  async getToken () {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken()
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken)
      }
    }
  }

  async requestPermission () {
    try {
      await firebase.messaging().requestPermission()
      // User has authorised
      this.getToken()
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected')
    }
  }

  render () {
    const { user, categories } = this.state
    if (user && user.token) {
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
    }

    const contextValue = getValue(user, {
      changeUser: this.onChangeUser,
      logout: this.onLogout,
    })
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='light-content' />
        <CategoryProvider value={{ categories, setCategories: this.setCategories }}>
          <UserProvider value={contextValue}>
            <RootStack uriPrefix={prefix} ref={this.rootStackRef} />
          </UserProvider>
        </CategoryProvider>
      </View>
    )
  }
}
