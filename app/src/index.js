import 'dayjs/locale/es'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { Component } from 'react'

import { StatusBar, View, AsyncStorage } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'

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

import { Provider as UserProvider, getValue } from './components/UserContext'
import { Provider as CategoryProvider } from './components/CategoriesContext'
import { instance } from './utils/http'
import { tabBarIcon } from './components/TabIcon'

dayjs.locale('es', {
  relativeTime: {
    future: 'en %s',
    past: '%s',
    s: '< 0s',
    ss: '%ss',
    m: '1m',
    mm: '%dm',
    h:  '1h',
    hh: '%dh',
    d:  '1d',
    dd: '%dd',
    M:  '1M',
    MM: '%dM',
    y:  '1a',
    yy: '%da'
  }
})
dayjs.extend(relativeTime)

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
    const { token, userId, interests } = user || {};
    
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
            <RootStack ref={this.rootStackRef} />
          </UserProvider>
        </CategoryProvider>
      </View>
    )
  }
}
