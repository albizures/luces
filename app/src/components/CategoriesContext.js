import React from 'react'

const CategoriesContext = React.createContext({})

const { Consumer, Provider } = CategoriesContext

function withCategories (Component) {
  const ComponentWithUser = props => (
    <Consumer>
      {data => <Component {...props} {...data} />}
    </Consumer>
  )
  ComponentWithUser.navigationOptions = Component.navigationOptions
  ComponentWithUser.displayName = 'CategoriesProvider'
  return ComponentWithUser
}

const getValue = (list) => list.reduce((categories, category) => {
  return {
    ...categories,
    [category.id]: {
      ...category,
    },
  }
}, {})

export {
  withCategories,
  Consumer,
  Provider,
  getValue,
}

export default CategoriesContext
