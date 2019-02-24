import React from 'react'
import PropTypes from 'prop-types'

const ConditionalRender = ({ component, props, condition, children }) => {
  const Component = component
  return condition ? (
    <Component {...props}>{children}</Component>
  ) : children
}

ConditionalRender.propTypes = {
  component: PropTypes.func.isRequired,
  condition: PropTypes.bool,
  children: PropTypes.node.isRequired,
  props: PropTypes.object,
}

export default ConditionalRender
