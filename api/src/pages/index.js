import React, { Component, Fragment } from 'react'
import Table from 'antd/lib/table'
import {Row, Col} from 'antd/lib/grid'
import notification from 'antd/lib/notification'

import Layout from '../components/Layout'
import CourseForm from '../components/CourseForm'
import Remove from '../components/Remove'
import Edit from '../components/Edit'
import coursesMessages from '../messages/courses'
import api from '../utils/api'

const styleExpandable = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch'
}

export default class Courses extends Component {
  renderRow = (course) => {
    return (
      <Fragment>
        <Edit data={course} edit={this.onEdit} />
        <Remove id={course.id} onRemove={this.onUpdate} delete={api.courses.del} />
      </Fragment>
    )
  }

  unSelect () {
    this.setState({
      selectedCourse: undefined
    })
  }

  onEdit = (course) => {
    this.setState({
      selectedCourse: course
    })
  }

  onUpdate = (shouldUnSelect = false) => {
    shouldUnSelect && this.unSelect()
    api.courses.getAll().then(({data: courses}) => {
      this.setState({ courses })
    }).catch(error => {
      console.error(error)
      notification.error(coursesMessages.getAll)
    })
  }

  renderCategory = (course) => {
    return (
      <Fragment>
        {this.props.categoriesMap[course.idCategory].name}
      </Fragment>
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      courses: props.courses
    }
    this.columns = [
      { title: 'Nombre', key: 'name', dataIndex: 'name' },
      // { title: 'Descripcion', key: 'description', dataIndex: 'description' },
      // { title: 'Autor', key: 'author', dataIndex: 'author' },
      { title: 'Categoria', key: 'idCategory', dataIndex: '', render: this.renderCategory },
      // { title: 'No. Videos', key: 'videos', dataIndex: 'videos' },
      { title: 'Acciones', dataIndex: '', key: 'x', render: this.renderRow, width: '180px' }
    ]
  }

  static async getInitialProps ({ req }) {
    api.server(req)
    const {data: categories} = await api.categories.getAll()
    const {data: courses} = await api.courses.getAll()
    const categoriesMap = categories.reduce((map, category) => ({
      ...map,
      [category.id]: category
    }), {})

    return { courses, categories, categoriesMap }
  }

  expandedRow (course) {
    return <div style={styleExpandable}>
      <div style={{flex: 1}}>
        <h4>{course.name}</h4>
        <p><strong>Descripcion: </strong> {course.description}</p>
        <p><strong>Autor: </strong>{course.author}</p>
        <p><strong>No. Videos: </strong>{course.videos}</p>
      </div>
      <div>
        <img height='204' src={course.image} alt={course.name} />
      </div>
    </div>
  }

  onCancelEdit = () => {
    this.unSelect()
  }

  render () {
    const { selectedCourse, courses } = this.state
    const { categories } = this.props
    return (
      <Layout>
        <h1>Cursos</h1>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <Table rowKey='id' dataSource={courses} columns={this.columns} expandedRowRender={this.expandedRow} />
          </Col>
          <Col className='gutter-row' span={12}>
            <CourseForm categories={categories} onUpdate={this.onUpdate} course={selectedCourse} cancelEdit={this.onCancelEdit} />
          </Col>
        </Row>
      </Layout>
    )
  }
}
