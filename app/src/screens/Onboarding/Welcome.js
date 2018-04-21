import React from 'react'

import Step from '../../components/Step'

const Welcome = (props) => {
  return (
    <Step
      image={require('../../assets/photos/welcome.jpg')}
      icon={require('../../assets/onboarding/welcome.png')}
      title='Bienvenida'
      description='¡Felicidades! haz dado el primer paso para impulsar tu aprendizaje' />
  )
}

export default Welcome
