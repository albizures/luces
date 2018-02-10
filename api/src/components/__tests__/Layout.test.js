import React from 'react'
import renderer from 'react-test-renderer'

import Layout from '../Layout.js'

describe('<Layout/>', () => {
  it('with children', () => {
    const component = renderer.create(
      <Layout>
        <div>
          Hello lalal
        </div>
      </Layout>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
