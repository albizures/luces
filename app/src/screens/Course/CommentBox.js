import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TextInput, Image, TouchableHighlight } from 'react-native'

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
    height: 30,
  }

  componentDidMount () {
    this.textInput.current.focus()
  }

  onRemoveImage = () => {
    this.setState({ image: undefined })
    if (this.closeImage) {
      this.closeImage()
    }
  }

  onAddImage = async () => {
    const { expandImage } = this.props.courseContext

    this.ignoreBlur = true
    try {
      const image = await showPicker()
      this.closeImage = expandImage({
        onModalClose: this.onRemoveImage,
        image,
      })

      this.setState({ image })
    } catch (error) {
      console.error('onAddImage', error)
    }

    this.textInput.current.focus()
    this.ignoreBlur = false
  }

  updateSize = (event) => {
    const { height } = event.nativeEvent.contentSize

    this.setState({
      height: height < 30 ? 30 : height,
    })
  }

  getFormData (comment, image, itComments) {
    if (!image) {
      return { comment, itComments }
    }

    const formData = new FormData()

    formData.append('comment', comment)
    formData.append('image', image)
    formData.append('itComments', itComments)

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
    const { addComment, itComments } = this.props.courseContext
    const comment = text.trim()

    const isThereAComment = Boolean(comment && comment.length !== 0)
    const isThereAImage = Boolean(image)

    if (!isThereAComment && !isThereAImage) {
      return
    }

    try {
      const formData = this.getFormData(comment, image, itComments)
      const { data: newComment } = await this.postComment(isThereAImage, formData)

      if (this.closeImage) {
        this.closeImage()
      }

      addComment(newComment)
    } catch (error) {
      console.error(error)
      console.error(error.code)
      console.error(error.config)

      alert('No se pudo agregar el comentario')
    }

    // this.setState({ image: undefined }, () => {
    //   this.textInput.current.blur()
    // })
  }

  onSetText = (text) => {
    this.setState({ text })
  }

  onBlur = () => {
    const { onBlurTextInput } = this.props.courseContext
    if (!this.ignoreBlur) {
      onBlurTextInput()
    }
  }

  render () {
    const { text, height, image } = this.state

    return (
      <View style={[styles.container, { height: height + 20 }]}>
        {!image && <View style={{ marginRight: 10 }}>
          <TouchableHighlight onPress={this.onAddImage}>
            <Image style={styles.add} source={require('../../assets/add.png')} />
          </TouchableHighlight>
        </View>}
        <TextInput
          value={text}
          placeholder='Escribe un comentario…'
          placeholderTextColor={colors.slateGrey}
          onContentSizeChange={this.updateSize}
          onChangeText={this.onSetText}
          ref={this.textInput}
          onBlur={this.onBlur}
          underlineColorAndroid='transparent'
          style={[styles.textInput, { height }]}
          multiline />
        <TouchableHighlight style={{ marginLeft: 10 }} onPress={this.onSubmit}>
          <View style={styles.sendIconContaner}>
            <Image style={styles.sendIcon} source={require('../../assets/send.png')} />
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

export default withCourseContext(CommentBox)

const styles = StyleSheet.create({
  sendIcon: {
    width: 13,
    height: 13,
  },
  sendIconContaner: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 122, 255)',
    borderRadius: 50,
    borderWidth: 0,
    width: 30,
    height: 30,
  },
  textInput: {
    borderRadius: 18,
    backgroundColor: colors.silver,
    flex: 1,
    fontSize: 14,
    lineHeight: 19,
    paddingHorizontal: 14,
    borderWidth: 0,
  },
  container: {
    padding: 10,
    paddingTop: 16,
    backgroundColor: colors.gunmetal,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 30,
  },
  add: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
  },
})
