import React, { Component, Fragment } from 'react'
import Table from 'antd/lib/table'
import {Row, Col} from 'antd/lib/grid'

import Layout from '../../components/Layout'
import CourseForm from '../../components/CourseForm'
import Remove from '../../components/Remove'
import Edit from '../../components/Edit'

import api from '../../utils/api'

const dataSource = [{
  key: '1',
  name: 'Mike',
  age: 32,
  address: '10 Downing Street'
}, {
  key: '2',
  name: 'John',
  age: 42,
  address: '10 Downing Street'
}]

const columns = [{
  title: 'Nombre',
  dataIndex: 'name',
  key: 'name'
}, {
  title: 'Categorias',
  dataIndex: 'age',
  key: 'age'
}, {
  title: 'Descripcion',
  dataIndex: 'address',
  key: 'address'
}]

export default class Courses extends Component {
  renderRow = (category) => {
    return (
      <Fragment>
        <Edit data={category} edit={this.onEdit} />
        <Remove id={category.id} update={this.onUpdate} delete={api.courses.del} />
      </Fragment>
    )
  }

  static async getInitialProps () {
    const {data: categories} = await api.categories.getAll()

    return { categories }
  }

  render () {
    return (
      <Layout>
        <h1>Cursos</h1>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <Table dataSource={dataSource} columns={columns} />
          </Col>
          <Col className='gutter-row' span={12}>
            <CourseForm categories={this.props.categories} />
          </Col>
        </Row>
      </Layout>
    )
  }
}
