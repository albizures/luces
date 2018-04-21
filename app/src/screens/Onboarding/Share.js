import React from 'react'

import Step from '../../components/Step'

const Welcome = (props) => {
  return (
    <Step
      image={require('../../assets/photos/share.jpg')}
      icon={require('../../assets/onboarding/share.png')}
      title='Comparte'
      description='Se parte de la comunidad de mujeres que aprendemos juntas todos los días' />
  )
}

export default Welcome
