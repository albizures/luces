import React from 'react'
import PropTypes from 'prop-types'
import assert from 'assert'

export const { Provider, Consumer } = React.createContext({
  comments: [],
  onBlurTextInput () {
    assert(false, 'Provide a valid `onBlurTextInput` function')
  },
  userRequiredAlert () {
    assert(false, 'Provide a valid `userRequiredAlert` function')
  },
  addComment () {
    assert(false, 'Provide a valid `addComment` function')
  },
  focusTextInput () {
    assert(false, 'Provide a valid `focusTextInput` function')
  },
})

export const CourseContextShape = {
  courseId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  itComments: PropTypes.number,
  expandImage: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  addComment: PropTypes.func.isRequired,
  focusTextInput: PropTypes.func.isRequired,
  userRequiredAlert: PropTypes.func.isRequired,
  onBlurTextInput: PropTypes.func.isRequired,
}

export const withCourseContext = (Component) => {
  const Wrapper = (props) => {
    return (
      <Consumer>
        {(context) => (
          <Component {...props} courseContext={context} />
        )}
      </Consumer>
    )
  }

  Wrapper.navigationOptions = Component.navigationOptions
  Wrapper.displayName = `withCourseContext${Component.displayName || Component.name}`

  return Wrapper
}
