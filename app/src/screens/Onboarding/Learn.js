import React from 'react'

import Step from '../../components/Step'

const Welcome = (props) => {
  return (
    <Step
      image={require('../../assets/photos/learn.jpg')}
      icon={require('../../assets/onboarding/learn.png')}
      title='Aprende'
      description='Con diferentes cursos grabados en alta definicion podrás potenciar tu conocimiento' />
  )
}

export default Welcome
