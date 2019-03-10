import React, { PureComponent } from 'react'
import { View, Text, TextInput, Image } from 'react-native'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import Heart from '../../components/Heart'
import { withUser } from '../../components/UserContext'
import createUrl from '../../utils/createUrl'
import colors from '../../utils/colors'
import http from '../../utils/http'
import { withCourseContext, CourseContextShape } from './CourseContext'

class Comments extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    courseContext: PropTypes.shape(CourseContextShape).isRequired,
  }

  state = {
    text: '',
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

  setCommentState (comment, likes, liked, index) {
    const { comments } = this.state
    this.setState({
      comments: Object.assign(
        comments.concat(),
        { [index]: Object.assign({}, comment, { likes: likes, liked: liked }) }
      ),
    })
  }

  onFocus = (evt) => {
    const { focusTextInput } = this.props.courseContext

    focusTextInput()
  }

  async toggleLike (comment, index) {
    const { user } = this.props
    const { userRequiredAlert } = this.props.courseContext
    const { id, liked } = comment

    if (!user) {
      return userRequiredAlert({
        title: '¿Quieres ser parte de la comunidad?',
        subtitle: 'Crea tu cuenta gratuita de Luces Beautiful para poder comentar.',
      })
    }

    try {
      if (liked) {
        const { data: { likes } } = await http.del(`comments/${id}/like`)
        this.setCommentState(comment, likes, !liked, index)
      } else {
        const { data: { likes } } = await http.post(`comments/${id}/like`)
        this.setCommentState(comment, likes, !liked, index)
      }
    } catch (error) {
      alert('No se puedo guardar la reaccion')
      console.log('Comments', error)
    }
  }

  getComment = (comment, index) => {
    const { comment: text, userName, liked, date, likes, id, cover } = comment

    const source = cover
      ? { uri: createUrl(cover) }
      : require('../../assets/account.png')
    return (
      <View key={id} style={styles.comment}>
        <Image style={styles.photo} source={source} />
        <View style={styles.commentContainer}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.text}>{text}</Text>
          <View style={styles.commentBottom}>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{dayjs(date).format('D MMMM, YYYY')}</Text>
            </View>
            <View style={styles.likesContainer}>
              <Text style={styles.likesCount} >{likes || 0} me gusta</Text>
              <Heart style={styles.like} active={!!liked} onPress={() => this.toggleLike(comment, index)} />
            </View>
          </View>
        </View>
      </View>
    )
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
        {comments.map(this.getComment)}
      </View>
    )
  }
}

const styles = {
  likesContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dateContainer: {
    paddingRight: 10,
    marginRight: 10,
    borderRightColor: colors.slateGrey,
    borderRightWidth: 1,
  },
  commentsCount: {
    fontSize: 14,
    marginBottom: 18,
    fontWeight: 'bold',
    color: colors.whiteTwo,
  },
  likesCount: {
    color: colors.whiteTwo,
    fontWeight: 'bold',
    fontSize: 10,
  },
  date: {
    color: colors.slateGrey,
    fontSize: 10,
  },
  like: {
    width: 14,
    height: 14,
  },
  userName: {
    fontSize: 14,
    color: colors.darkTan,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.whiteTwo,
    marginBottom: 6,
  },
  commentBottom: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
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
  comment: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gunmetal,
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

export default withCourseContext(withUser(Comments))
