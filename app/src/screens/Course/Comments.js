import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../../utils/colors'
import Comment from './Comment'
import FakeCommentBox from './FakeCommentBox'
import { withCourseContext, CourseContextShape } from './CourseContext'

class Comments extends PureComponent {
  static propTypes = {
    courseContext: PropTypes.shape(CourseContextShape).isRequired,
  }

  // state = {
  //   comments: [
  //     {
  //       id: 1,
  //       userName: 'Lorena Enriquez',
  //       liked: true,
  //       date: '17 junio, 2018',
  //       text: '¡Me encantó el curso! aprendí nuevas técnicas que no había visto antes.',
  //       likesCount: 13
  //     },
  //     {
  //       id: 2,
  //       userName: 'Lorena Enriquez',
  //       liked: false,
  //       date: '17 junio, 2018',
  //       text: '¡Me encantó el curso! aprendí nuevas técnicas que no había visto antes.',
  //       likesCount: 13
  //     },
  //     {
  //       id: 3,
  //       userName: 'Lorena Enriquez',
  //       liked: false,
  //       date: '17 junio, 2018',
  //       text: '¡Me encantó el curso! aprendí nuevas técnicas que no había visto antes.',
  //       likesCount: 13
  //     }
  //   ]
  // }

  onFocus = (evt) => {
    const { focusTextInput } = this.props.courseContext

    focusTextInput()
  }

  render () {
    const { comments } = this.props.courseContext

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.inputContainer}>
          <Text style={styles.commentsCount}>{comments.length} {comments.length === 1 ? 'comentario' : 'comentarios'} </Text>
          <FakeCommentBox onFocus={this.onFocus} />
        </View>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </View>
    )
  }
}

const styles = {
  commentsCount: {
    fontSize: 14,
    marginBottom: 18,
    fontWeight: 'bold',
    color: colors.whiteTwo,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
}

export default withCourseContext(Comments)
