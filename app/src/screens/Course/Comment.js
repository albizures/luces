import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableHighlight, Alert } from 'react-native'
import FitImage from 'react-native-fit-image'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import createUrl from '../../utils/createUrl'
import colors from '../../utils/colors'
import http from '../../utils/http'
import { withUser } from '../../components/UserContext'
import Heart from '../../components/Heart'
import { withCourseContext, CourseContextShape } from './CourseContext'
import FakeCommentBox from './FakeCommentBox'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    user: PropTypes.object,
    courseContext: PropTypes.shape(CourseContextShape).isRequired,
  }

  constructor(props) {
    super(props)

    const { comment } = this.props
    const { liked, likes } = comment

    this.state = {
      liked,
      likes,
      comments: [],
      isDeleted: false,
      showComments: false,
    }
  }

  toggleLike = async () => {
    const { comment, user } = this.props
    const { userRequiredAlert } = this.props.courseContext
    const { id } = comment
    const { liked } = this.state

    if (!user) {
      return userRequiredAlert({
        title: '¿Quieres ser parte de la comunidad?',
        subtitle: 'Crea tu cuenta gratuita de Luces Beautiful para poder comentar.',
      })
    }

    try {
      if (liked) {
        const { data: { likes } } = await http.del(`comments/${id}/like`)
        this.setState({ likes, liked: !liked })
      } else {
        const { data: { likes } } = await http.post(`comments/${id}/like`)
        this.setState({ likes, liked: !liked })
      }
    } catch (error) {
      alert('No se puedo guardar la reaccion')
      console.log('Comments', error)
    }
  }

  onPressImage = () => {
    const { image } = this.props.comment
    const { expandImage } = this.props.courseContext

    expandImage({
      image: { uri: createUrl(image) },
    })
  }

  onFocus = (evt) => {
    const { id } = this.props.comment
    const { comments } = this.state
    const { focusTextInput } = this.props.courseContext

    focusTextInput(id, (comment) => {
      this.setState({
        comments: [comment].concat(comments),
      })
    })
  }

  onComments = async () => {
    const { id } = this.props.comment
    this.setState({
      showComments: true,
    })

    try {
      const { data: comments = [] } = await http.get(`comments/${id}/comments`)

      this.setState({ comments })
    } catch (error) {
      this.setState({ showComments: false })
    }
  }

  deleteComment = async() => {
    const { id } = this.props.comment
    try {
      await http.del(`comments/${id}`)

      this.setState({ isDeleted: true })
    } catch (error) {
      alert('No se pudo eliminar el comentario');
    }
  }

  onDeleteComment = async () => {
    Alert.alert(
      '¿Esta segura que quiere eliminar el comentario?',
      '',
      [
        { text: 'Eliminar', onPress: this.deleteComment },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    )

    
  }

  getComments = () => {
    const { showComments, comments } = this.state

    if (!showComments) {
      return null
    }

    const elements = (comments && comments.length > 0)
      ? comments.map((comment) => (
        <Comment key={comment.id} courseContext={this.props.courseContext} comment={comment} />
      ))
      : (
        <Text style={{ marginTop: 20, marginBottom: 10, textAlign: 'center', color: colors.white }}>Sé el primero en comentar</Text>
      )

    return (
      <View style={styles.commentsContainer}>
        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
          <FakeCommentBox onFocus={this.onFocus} />
        </View>
        <View style={styles.comments}>
          {elements}
        </View>
      </View>
    )
  }

  render() {
    const { comment, user } = this.props
    const { comment: text, userName, date, cover, image, itComments } = comment
    const { liked, likes, isDeleted } = this.state

    if (isDeleted) {
      return null;
    }

    const source = cover
      ? { uri: createUrl(cover) }
      : require('../../assets/account.png')

    const sourceImage = image
      ? { uri: createUrl(image) }
      : false

    const comments = this.getComments()

    const itDoComments = Number.isInteger(itComments)

    return (
      <View style={[styles.container, itDoComments ? {} : styles.containerBorder]}>
        <View style={styles.comment}>
          <Image style={styles.photo} source={source} />
          <View style={styles.commentContainer}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.text}>{text}</Text>
            {sourceImage && (
              <View style={styles.imageContainer}>
                <TouchableHighlight onPress={this.onPressImage}>
                  <FitImage source={sourceImage} style={styles.image} />
                </TouchableHighlight>
              </View>
            )}
            <View style={styles.commentBottom}>
              <View style={styles.dateContainer}>
                <Text style={styles.date}>{dayjs(date).fromNow()}</Text>
              </View>
              <View style={styles.likesContainer}>
                <Text style={styles.likesCount} >{likes || 0} me gusta</Text>
              </View>
              {!itDoComments && (
                <View style={styles.commentTextContainer}>
                  <Text style={styles.commentText} onPress={this.onComments}>Comentar</Text>
                </View>
              )}
              { user && user.userId === comment.user && (
                <View style={styles.deleteCommentContainer}>
                  <Text style={styles.deleteComment} onPress={this.onDeleteComment}>Eliminar</Text>
                </View>
              )}
              <View style={styles.likeContainer}>
                <Heart style={styles.like} active={!!liked} onPress={this.toggleLike} />
              </View>
            </View>
          </View>
        </View>
        {comments}
      </View>
    )
  }
}

export default withCourseContext(withUser(Comment))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  containerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gunmetal,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 8,
  },
  like: {
    width: 14,
    height: 14,
  },
  likesCount: {
    color: colors.whiteTwo,
    fontWeight: 'bold',
    fontSize: 10,
  },
  likesContainer: {
    paddingLeft: 10,
    marginLeft: 10,
    borderLeftColor: colors.slateGrey,
    borderLeftWidth: 1,
  },
  date: {
    color: colors.slateGrey,
    fontSize: 10,
  },
  dateContainer: {
  },
  commentBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.whiteTwo,
    marginBottom: 6,
  },
  userName: {
    fontSize: 14,
    color: colors.darkTan,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  comment: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  commentsContainer: {
    marginLeft: 50,
  },
  comments: {
    flex: 1,
  },
  commentContainer: {
    flex: 1,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentTextContainer: {
    paddingLeft: 10,
    marginLeft: 10,
    borderLeftColor: colors.slateGrey,
    borderLeftWidth: 1,
  },
  commentText: {
    color: colors.whiteTwo,
    fontWeight: 'bold',
    fontSize: 10,
  },
  deleteCommentContainer: {
    paddingLeft: 10,
    marginLeft: 10,
    borderLeftColor: colors.slateGrey,
    borderLeftWidth: 1,
  },
  deleteComment: {
    color: colors.whiteTwo,
    fontWeight: 'bold',
    fontSize: 10,
  },
  likeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  }
})
