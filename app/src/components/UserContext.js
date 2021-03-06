import React from 'react'

const UserContext = React.createContext(undefined)

const { Consumer, Provider } = UserContext

function withUser (Component) {
  const ComponentWithUser = props => (
    <Consumer>
      {data => <Component {...props} {...data} />}
    </Consumer>
  )
  ComponentWithUser.navigationOptions = Component.navigationOptions
  ComponentWithUser.displayName = 'UserProvider'
  return ComponentWithUser
}

const getValue = (user, { changeUser, logout }) => ({ user, changeUser, logout })

export {
  withUser,
  Consumer,
  Provider,
  getValue,
}

export default UserContext
