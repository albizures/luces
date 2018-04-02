import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'

import Onboarding from './screens/Onboarding'
import Home from './screens/Home'

import { Provider as UserProvider, getValue } from './components/UserContext'

const OnboardingStack = StackNavigator({
  Onboarding: {
    screen: Onboarding
  }
}, {
  headerMode: 'none',
  initialRouteName: 'Onboarding'
})

const MainStack = StackNavigator({
  Home: {
    screen: Home
  }
}, {
  headerMode: 'none',
  initialRouteName: 'Home'
})

const RootStack = StackNavigator({
  Onboarding: {
    screen: OnboardingStack
  },
  Main: {
    screen: MainStack
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
