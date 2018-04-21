import React from 'react'

const UserContext = React.createContext(undefined)

const { Consumer, Provider } = UserContext

function withUser (Component) {
  const ComponentWithUser = props => (
    <Consumer>
      {data => <Component {...props} user={data.user} changeUser={data.onChangeUser} />}
    </Consumer>
  )
  ComponentWithUser.navigationOptions = Component.navigationOptions
  ComponentWithUser.displayName = 'UserProvider'
  return ComponentWithUser
}

const getValue = (user, onChangeUser) => ({ user, onChangeUser })

export {
  withUser,
  Consumer,
  Provider,
  getValue
}

export default UserContext
