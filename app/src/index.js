import React, { Component } from 'react'
import { Text } from 'react-native'
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation'

import Onboarding from './screens/Onboarding'
import Interests from './screens/Interests'
import Home from './screens/Home'
import Course from './screens/Course'
import HomeCourse from './screens/HomeCourse'
import Favorites from './screens/Favorites'
import Search from './screens/Search'
import Account from './screens/Account'

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

const styles = {
  tabBarLabel: {
    fontSize: 10,
    color: '#b98a56',
    fontWeight: '500'
  }
}

const CoursesStack = StackNavigator({
  HomeCourses: {
    screen: Home
  },
  HomeCourse: {
    screen: HomeCourse
  },
  Course: {
    screen: Course
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
    screen: Account
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
  }
}, {
  initialRouteName: 'Main',
  mode: 'modal',
  headerMode: 'none'
})

export default class App extends Component {
  state = {
    user: {interests: true}
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
