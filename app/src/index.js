import 'dayjs/locale/es'
import React, { Component } from 'react'
import { StatusBar, View, AsyncStorage } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

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
import Course from './screens/Course/index'
import dayjs from 'dayjs'

import { Provider as UserProvider, getValue } from './components/UserContext'
import { Provider as CategoryProvider, getValue as getCategoryValue } from './components/CategoriesContext'
import http, { instance } from './utils/http'
import { tabBarIcon } from './components/TabIcon'

dayjs.locale('es')

const OnboardingStack = createStackNavigator({
  Onboarding: {
    screen: Onboarding
  }
}, {
  headerMode: 'none',
  initialRouteName: 'Onboarding'
})

const AccountStack = createStackNavigator({
  HomeAccount: {
    screen: Account
  },
  Profile: {
    screen: Profile
  },
  Notifications: {
    screen: Notifications
  },
  InterestsAccount: {
    screen: InterestsAccount
  }
}, {
  headerMode: 'none',
  initialRouteName: 'HomeAccount'
})

AccountStack.navigationOptions = {
  title: 'Cuenta',
  tabBarIcon: tabBarIcon({
    active: require('./assets/tabs/account_active.png'),
    inactive: require('./assets/tabs/account.png')
  })
}

const CoursesStack = createStackNavigator({
  HomeCourses: {
    screen: Home
  },
  HomeCourse: {
    screen: HomeCourse
  }
}, {
  initialRouteName: 'HomeCourses',
  headerMode: 'none'
})

CoursesStack.navigationOptions = {
  title: 'Cursos',
  tabBarIcon: tabBarIcon({
    active: require('./assets/tabs/courses_active.png'),
    inactive: require('./assets/tabs/courses.png')
  })
}

const MainTab = createBottomTabNavigator({
  Home: {
    screen: CoursesStack
  },
  Favorites: {
    screen: Favorites
  },
  Search: {
    screen: Search
  },
  Account: {
    screen: AccountStack
  }
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
      borderTopColor: '#656767'
    }
  },
  animationEnabled: true,
  swipeEnabled: true
})

const RootStack = createStackNavigator({
  Onboarding: {
    screen: OnboardingStack
  },
  Interests: {
    screen: Interests
  },
  Main: {
    screen: MainTab
  },
  Course: {
    screen: Course
  }
}, {
  navigationOptions: {
    gesturesEnabled: false
  },
  initialRouteName: 'Main',
  mode: 'modal',
  headerMode: 'none'
})

export default class App extends Component {
  async getCategories () {
    const { data: categories } = await http.get('categories')

    return categories
  }
  async componentDidMount () {
    try {
      const [token, categories] = await Promise.all([
        AsyncStorage.getItem('token'),
        this.getCategories()
      ])

      if (Array.isArray(categories)) {
        this.setState({
          categories: getCategoryValue(categories)
        })
      }

      if (token) {
        const interests = await AsyncStorage.getItem('interests')
        this.setState({
          user: {
            token,
            interests: Boolean(interests)
          }
        })
      } else {
        this.setState({
          user: null
        })
      }
    } catch (error) {
      console.log('index', error)
      alert('Ocurrio un error cargando el usuario')
    }
  }

  state = {
    categories: {}
    // user: { interests: false }
  }

  onChangeUser = async (user) => {
    if (user.token) {
      await AsyncStorage.setItem('token', user.token)
    }
    if (user.interests) {
      await AsyncStorage.setItem('interests', 'true')
    }
    this.setState({ user })
  }

  render () {
    const { user } = this.state
    if (user && user.token) {
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
    }

    const contextValue = getValue(user, this.onChangeUser)
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='light-content' />
        <CategoryProvider value={this.state.categories}>
          <UserProvider value={contextValue}>
            <RootStack />
          </UserProvider>
        </CategoryProvider>
      </View>
    )
  }
}
