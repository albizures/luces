import React, { Component } from 'react'
import Button from 'antd/lib/button'
import Table from 'antd/lib/table'
import {Row, Col} from 'antd/lib/grid'
import notification from 'antd/lib/notification'
import axios from 'axios'

import Layout from '../../components/Layout'
import CourseForm from '../../components/CategoryForm'

const columns = [{
  title: 'Nombre',
  key: 'name',
  dataIndex: 'name'
}]

const getCategories = async () => {
  const { data: categories } = await axios.get('/categories')
  return categories
}

export default class Categories extends Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: props.categories
    }
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
    return (
      <Layout>
        <h1>Cursos</h1>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <Table rowKey='id' dataSource={this.state.categories} columns={columns} />
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
