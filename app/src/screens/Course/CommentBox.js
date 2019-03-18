import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TextInput, Text } from 'react-native'

import colors from '../../utils/colors'
import http from '../../utils/http'
import { showPicker } from './utils'
import { withCourseContext, CourseContextShape } from './CourseContext'

class CommentBox extends Component {
  static propTypes = {
    courseContext: PropTypes.shape(CourseContextShape).isRequired,
  }

  textInput = React.createRef()

  state = {
    text: '',
    height: 40,
  }

  componentDidMount () {
    this.textInput.current.focus()
  }

  onAddImage = async () => {
    try {
      const source = await showPicker()
      this.setState({
        image: source,
      })
    } catch (error) {
      console.error('onAddImage', error)
    }
  }

  updateSize = (height) => {
    this.setState({
      height: height < 46 ? 46 : height,
    })
  }

  getFormData (comment, image) {
    if (!image) {
      return { comment }
    }

    const formData = new FormData()

    formData.append('comment', comment)
    formData.append('image', image)

    return formData
  }

  postComment (isThereAImage, formData) {
    const { courseId } = this.props.courseContext

    if (isThereAImage) {
      return http.postWithFile(`courses/${courseId}/comment/image`, formData)
    }

    return http.post(`courses/${courseId}/comment`, formData)
  }

  onSubmit = async () => {
    const { text, image } = this.state
    const { addComment } = this.props.courseContext
    const comment = text.trim()

    const isThereAComment = Boolean(comment && comment.length !== 0)
    const isThereAImage = Boolean(image)

    if (!(isThereAComment && isThereAImage)) {
      return
    }

    try {
      const formData = this.getFormData(comment, image)
      const { data: newComment } = await this.postComment(isThereAImage, formData)
      console.log(newComment)

      addComment(newComment)
    } catch (error) {
      console.error(error)
      console.log(error.code)
      console.log(error.config)

      alert('No se pudo agregar el comentario')
    }
  }

  render () {
    const { onBlurTextInput } = this.props.courseContext
    const { text, height } = this.state

    return (
      <View style={[styles.container, { height: height + 20 }]}>
        <Text style={styles.add} onPress={this.onAddImage}>
          +
        </Text>
        <TextInput
          onSubmitEditing={this.onSubmit}
          blurOnSubmit
          value={text}
          onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
          onChangeText={(text) => this.setState({ text })}
          ref={this.textInput}
          onBlur={onBlurTextInput}
          underlineColorAndroid='transparent'
          style={[styles.textInput, { height }]}
          multiline />
      </View>
    )
  }
}

export default withCourseContext(CommentBox)

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 20,
    backgroundColor: colors.whiteTwo,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    textAlignVertical: 'top',
    borderWidth: 0,
  },
  container: {
    padding: 10,
    backgroundColor: 'gray',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 30,
  },
  add: {
    fontSize: 40,
    lineHeight: 36,
    marginRight: 10,
    fontWeight: '200',
    backgroundColor: 'transparent',
    color: colors.whiteTwo,
  },
})
