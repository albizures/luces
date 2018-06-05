import React, { Component, Fragment } from 'react'
import Table from 'antd/lib/table'
import {Row, Col} from 'antd/lib/grid'
import notification from 'antd/lib/notification'

import Remove from '../../components/Remove'
import Edit from '../../components/Edit'
import Layout from '../../components/Layout'
import CategoryForm from '../../components/CategoryForm'
import categoryMessages from '../../messages/categories'
import api from '../../utils/api'

export default class Categories extends Component {
  renderRow = (category) => {
    return (
      <Fragment>
        <Edit data={category} edit={this.onEdit} />
        <Remove id={category.id} onRemove={this.onUpdate} delete={api.categories.del} />
      </Fragment>
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      categories: props.categories
    }
    this.columns = [
      { title: 'Nombre', key: 'name', dataIndex: 'name' },
      { title: 'Acciones', dataIndex: '', key: 'x', render: this.renderRow, width: '180px' }
    ]
  }

  onEdit = (category) => {
    this.setState({
      selectedCategory: category
    })
  }

  onCancelEdit = () => {
    this.unSelect()
  }

  unSelect () {
    this.setState({
      selectedCategory: undefined
    })
  }

  onUpdate = (shouldUnSelect = false) => {
    shouldUnSelect && this.unSelect()
    api.categories.getAll().then(({data: categories}) => {
      this.setState({ categories })
    }).catch(error => {
      console.error(error)
      notification.error(categoryMessages.getAll)
    })
  }

  static async getInitialProps ({ req }) {
    api.server(req)
    const {data: categories} = await api.categories.getAll()

    return { categories }
  }

  render () {
    const { categories, selectedCategory } = this.state
    return (
      <Layout>
        <h1>Categorias</h1>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <Table rowKey='id' dataSource={categories} columns={this.columns} />
          </Col>
          <Col className='gutter-row' span={12}>
            <CategoryForm category={selectedCategory} onUpdate={this.onUpdate} cancelEdit={this.onCancelEdit} />
          </Col>
        </Row>
      </Layout>
    )
  }
}
