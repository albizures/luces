import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableHighlight } from 'react-native'

import OnboardingSwiper from '../../components/Onboarding'
import { withUser } from '../../components/UserContext'

import Welcome from './Welcome'
import Learn from './Learn'
import Share from './Share'
import Login from './Login'

import colors from '../../utils/colors'

const styles = {
  container: {
    backgroundColor: colors.black,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  skipLabel: {
    textDecorationLine: 'underline',
    color: '#b98955',
    fontSize: 12,
    fontWeight: 'bold'
  },
  nextIconContainer: {
    marginRight: 22
  },
  nextIcon: {
    width: 10,
    height: 20
  }
}
const NextIcon = (props) => (
  <TouchableHighlight {...props} style={styles.nextIconContainer} >
    <Image source={require('../../assets/next.png')} style={styles.nextIcon} />
  </TouchableHighlight>
)
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
    // onSkip={this.goHome}
    return (
      <View style={styles.container}>
        <OnboardingSwiper
          showDone={false}
          skipLabel={<Text style={styles.skipLabel}>Saltar</Text>}
          NextButtonComponent={NextIcon}
          pages={[
            () => <Welcome />,
            () => <Learn />,
            () => <Share />,
            () => <Login navigation={this.goHome} />
          ]} />
      </View>
    )
  }
}

export default withUser(Onboarding)
