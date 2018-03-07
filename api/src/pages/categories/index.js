import React, { Component } from 'react'
import Button from 'antd/lib/button'
import Table from 'antd/lib/table'
import {Row, Col} from 'antd/lib/grid'

import Layout from '../../components/Layout'
import CourseForm from '../../components/CategoryForm'
import axios from 'axios'

const columns = [{
  title: 'Nombre',
  key: 'name',
  dataIndex: 'name'
}]

export default class Categories extends Component {
  static async getInitialProps () {
    const { data: categories } = await axios.get('/api/categories')

    return { categories }
  }

  render () {
    return (
      <Layout>
        <h1>Cursos</h1>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <Table rowKey='id' dataSource={this.props.categories} columns={columns} />
          </Col>
          <Col className='gutter-row' span={12}>
            <CourseForm />
          </Col>
        </Row>
        <Button type='primary'>Button</Button>
      </Layout>
    )
  }
}
