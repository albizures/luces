import React, { Component } from 'react'
import Button from 'antd/lib/button'
import Table from 'antd/lib/table'
import {Row, Col} from 'antd/lib/grid'
import notification from 'antd/lib/notification'
import axios from 'axios'

import Remove from '../../components/Remove'
import Layout from '../../components/Layout'
import CourseForm from '../../components/CategoryForm'

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
      <Remove id={category.id} update={this.onUpdate} delete={deleteCategory} />
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      categories: props.categories
    }
    this.columns = [
      { title: 'Nombre', key: 'name', dataIndex: 'name' },
      { title: 'Action', dataIndex: '', key: 'x', render: this.renderRow }
    ]
  }

  onUpdate = () => {
    getCategories().then(categories => {
      this.setState({ categories })
    }).catch(error => {
      console.error(error)
      notification.error({
        message: 'Error',
        description: 'Ocurrio un error consultando las categorias, por favor recargue la pagina'
      })
    })
  }

  static async getInitialProps () {
    const categories = await getCategories()

    return { categories }
  }

  render () {
    console.log(this.state.categories)
    return (
      <Layout>
        <h1>Cursos</h1>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <Table rowKey='id' dataSource={this.state.categories} columns={this.columns} />
          </Col>
          <Col className='gutter-row' span={12}>
            <CourseForm onUpdate={this.onUpdate} />
          </Col>
        </Row>
        <Button type='primary'>Button</Button>
      </Layout>
    )
  }
}
