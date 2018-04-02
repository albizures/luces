import React from 'react'

import Step from '../../components/Step'

const Welcome = (props) => {
  return (
    <Step
      image={require('../../assets/300x300.png')}
      icon={require('../../assets/300x300.png')}
      title='Aprende'
      description='Con diferentes cursos grabados en alta definicion podrás potenciar tu conocimiento' />
  )
}

export default Welcome
