import React, { Component, Fragment } from 'react'
import Button from 'antd/lib/button'
import Table from 'antd/lib/table'
import {Row, Col} from 'antd/lib/grid'
import notification from 'antd/lib/notification'
import axios from 'axios'

import Remove from '../../components/Remove'
import Edit from '../../components/Edit'
import Layout from '../../components/Layout'
import CategoryForm from '../../components/CategoryForm'
import categoryMessages from '../../messages/categories'

const getCategories = async () => {
  const { data: categories } = await axios.get('/categories')
  return categories
}

const deleteCategory = async (id) => {
  await axios.delete('/categories/' + id)
  return id
}

export default class Categories extends Component {
  renderRow = (category) => {
    return (
      <Fragment>
        <Edit data={category} edit={this.onEdit} />
        <Remove id={category.id} update={this.onUpdate} delete={deleteCategory} />
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
    console.warn(shouldUnSelect)
    shouldUnSelect && this.unSelect()
    getCategories().then(categories => {
      this.setState({ categories })
    }).catch(error => {
      console.error(error)
      notification.error(categoryMessages.getCategories)
    })
  }

  static async getInitialProps () {
    const categories = await getCategories()

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
