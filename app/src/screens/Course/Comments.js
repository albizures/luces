import React, { PureComponent } from 'react'
import { View, Text, TextInput } from 'react-native'
import PropTypes from 'prop-types'

import colors from '../../utils/colors'
import Comment from './Comment'
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
          <TextInput
            // onSubmitEditing={this.onSubmit}
            // blurOnSubmit
            // onChangeText={(text) => this.setState({ text })}
            // value={text}
            onFocus={this.onFocus}
            placeholderTextColor={colors.whiteTwo}
            placeholder='Escribe un comentario…'
            // numberOfLines={4}
            style={styles.input} />
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
  input: {
    paddingHorizontal: 10,
    color: colors.whiteTwo,
    backgroundColor: colors.gunmetal,
    borderRadius: 6,
    height: 40,
    width: '100%',
  },
}

export default withCourseContext(Comments)
