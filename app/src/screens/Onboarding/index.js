import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Image, TouchableHighlight } from 'react-native'

import OnboardingSwiper from '../../components/Onboarding'
import Container from '../../components/Container'
import { withUser } from '../../components/UserContext'

import Welcome from './Welcome'
import Learn from './Learn'
import Share from './Share'
import Enter from './Enter'

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipLabel: {
    textDecorationLine: 'underline',
    color: '#b98955',
    fontSize: 12,
    fontWeight: 'bold',
  },
  nextIconContainer: {
    marginRight: 22,
  },
  nextIcon: {
    width: 10,
    height: 20,
  },
}
const NextIcon = (props) => (
  <TouchableHighlight {...props} style={styles.nextIconContainer} >
    <Image source={require('../../assets/next.png')} style={styles.nextIcon} />
  </TouchableHighlight>
)
class Onboarding extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    changeUser: PropTypes.func.isRequired,
  }

  state = {
    loading: false,
  }

  goHome = () => {
    this.props.changeUser({})
    this.props.navigation.navigate('Home')
  }

  setLoaderStatus = (status) => {
    this.setState({
      loading: status,
    })
  }

  render () {
    const { navigation } = this.props
    const { loading } = this.state
    return (
      <Container style={styles.container} isLoading={loading}>
        <OnboardingSwiper
          showDone={false}
          skipLabel={<Text style={styles.skipLabel}>Saltar</Text>}
          NextButtonComponent={NextIcon}
          pages={[
            () => <Welcome />,
            () => <Learn />,
            () => <Share />,
            () => <Enter navigation={navigation} />,
          ]} />
      </Container>
    )
  }
}

export default withUser(Onboarding)
