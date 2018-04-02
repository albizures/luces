import React from 'react'

import Step from '../../components/Step'

const Welcome = (props) => {
  return (
    <Step
      image={require('../../assets/300x300.png')}
      icon={require('../../assets/300x300.png')}
      title='Bienvenida'
      description='¡Felicidades! haz dado el primer paso para impulsar tu aprendizaje' />
  )
}

export default Welcome
