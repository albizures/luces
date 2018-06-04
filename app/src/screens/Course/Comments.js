import React, { PureComponent } from 'react'
import { View, Text, TextInput, Image, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
// import dayjs from 'dayjs'

import colors from '../../utils/colors'
import http from '../../utils/http'

export default class Comments extends PureComponent {
  static propTypes = {
    courseId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }

  state = {
    comments: []
  }

  async componentDidMount () {
    // const { courseId } = this.props
    // this.setState({
    //   com
    // })
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

  onSubmit = async (evt) => {
    const { text: comment, comments } = this.state
    const { courseId } = this.props
    try {
      const newComment = await http.post(`courses/${courseId}/comment`, { comment })
      this.setState({
        text: '',
        comments: [newComment].concat(comments)
      })
    } catch (error) {
      alert('Algo salio mal, intentelo de nuevo')
    }
  }

  getComment (comment) {
    const { text, userName, liked, date, likesCount, id } = comment
    return (
      <View key={id} style={styles.comment}>
        <Image style={styles.photo} source={require('../../assets/300x300.png')} />
        <View style={styles.commentContainer}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.text}>{text}</Text>
          <View style={styles.commentBottom}>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.likesContainer}>
              <Text style={styles.likesCount} >{likesCount || 0} me gusta</Text>
              <Image style={styles.like} source={liked ? require('../../assets/like_active.png') : require('../../assets/like.png')} />
            </View>
          </View>
        </View>
      </View>
    )
  }

  render () {
    const { comments } = this.state
    return (
      <ScrollView style={{paddingBottom: 100}}>
        <View style={styles.inputContainer}>
          <Text style={styles.commentsCount}>{comments.length} comentarios</Text>
          <TextInput
            onSubmitEditing={this.onSubmit}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholderTextColor={colors.whiteTwo}
            placeholder='Escribe un comentario…'
            style={styles.input}
            multiline
            numberOfLines={4} />
        </View>
        {comments.map(this.getComment)}
      </ScrollView>
    )
  }
}

const styles = {
  likesContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  dateContainer: {
    paddingRight: 10,
    marginRight: 10,
    borderRightColor: colors.slateGrey,
    borderRightWidth: 1
  },
  commentsCount: {
    fontSize: 14,
    marginBottom: 18,
    fontWeight: 'bold',
    color: colors.whiteTwo
  },
  likesCount: {
    color: colors.whiteTwo,
    fontWeight: 'bold',
    fontSize: 10
  },
  date: {
    color: colors.slateGrey,
    fontSize: 10
  },
  like: {
    width: 14,
    height: 14
  },
  userName: {
    fontSize: 14,
    color: colors.darkTan,
    fontWeight: 'bold',
    marginBottom: 10
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.whiteTwo,
    marginBottom: 6
  },
  commentBottom: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center'
  },
  commentContainer: {
    flex: 1
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10
  },
  comment: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gunmetal
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  input: {
    padding: 10,
    color: colors.whiteTwo,
    backgroundColor: colors.gunmetal,
    borderRadius: 6,
    height: 60,
    width: '100%'
  }
}
