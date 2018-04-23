import React, { Component } from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'

import Onboarding from './screens/Onboarding'
import Interests from './screens/Interests'
import Home from './screens/Home'
import Course from './screens/Course'
import HomeCourse from './screens/HomeCourse'
import Favorites from './screens/Favorites'
import Search from './screens/Search'
import Account from './screens/Account'
import Profile from './screens/Profile'
import Notifications from './screens/Notifications'
import InterestsAccount from './screens/InterestsAccount'

import { Provider as UserProvider, getValue } from './components/UserContext'

const OnboardingStack = StackNavigator({
  Onboarding: {
    screen: Onboarding
  }
}, {
  headerMode: 'none',
  initialRouteName: 'Onboarding'
})

const InterestsStack = StackNavigator({
  Interests: {
    screen: Interests
  }
}, {
  headerMode: 'none',
  initialRouteName: 'Interests'
})

const AccountStack = StackNavigator({
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

const CoursesStack = StackNavigator({
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

const MainTab = TabNavigator({
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

const RootStack = StackNavigator({
  Onboarding: {
    screen: OnboardingStack
  },
  InterestsStack: {
    screen: InterestsStack
  },
  Main: {
    screen: MainTab
  },
  Course: {
    screen: Course
  }
}, {
  initialRouteName: 'Main',
  mode: 'modal',
  headerMode: 'none'
})

export default class App extends Component {
  state = {
    user: undefined
  }

  onChangeUser = (user) => {
    this.setState({ user })
  }

  render () {
    const { user } = this.state
    const contextValue = getValue(user, this.onChangeUser)
    return (
      <UserProvider value={contextValue}>
        <RootStack />
      </UserProvider>
    )
  }
}
