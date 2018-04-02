import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import OnboardingSwiper from '../../components/Onboarding'
import { withUser } from '../../components/UserContext'

import Welcome from './Welcome'
import Learn from './Learn'
import Share from './Share'
import Login from './Login'

const styles = {
  backgroundColor: 'whitesmoke',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
}

class Onboarding extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    changeUser: PropTypes.func.isRequired
  }

  goHome = () => {
    this.props.changeUser({})
    this.props.navigation.navigate('Home')
  }

  render () {
    return (
      <View style={styles}>
        <OnboardingSwiper
          onSkip={this.goHome}
          showDone={false}
          pages={[
            () => <Welcome />,
            () => <Learn />,
            () => <Share />,
            () => <Login navigation={this.goHome} />
          ]}
        />
      </View>
    )
  }
}

export default withUser(Onboarding)
