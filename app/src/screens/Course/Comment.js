import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import FitImage from 'react-native-fit-image'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import createUrl from '../../utils/createUrl'
import colors from '../../utils/colors'
import http from '../../utils/http'
import { withUser } from '../../components/UserContext'
import Heart from '../../components/Heart'
import { withCourseContext, CourseContextShape } from './CourseContext'

// const { width } = Dimensions.get('window')

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    user: PropTypes.object,
    courseContext: PropTypes.shape(CourseContextShape).isRequired,
  }

  constructor (props) {
    super(props)

    const { comment } = this.props
    const { liked, likes } = comment

    this.state = {
      liked,
      likes,
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

  render () {
    const { comment } = this.props
    const { comment: text, userName, date, cover, image } = comment
    const { liked, likes } = this.state

    const source = cover
      ? { uri: createUrl(cover) }
      : require('../../assets/account.png')

    const sourceImage = image
      ? { uri: createUrl(image) }
      : false

    return (
      <View style={styles.comment}>
        <Image style={styles.photo} source={source} />
        <View style={styles.commentContainer}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.text}>{text}</Text>
          { sourceImage && (
            <View style={styles.imageContainer}>
              <FitImage source={sourceImage} style={styles.image} />
            </View>
          )}
          <View style={styles.commentBottom}>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{dayjs(date).format('D MMMM, YYYY')}</Text>
            </View>
            <View style={styles.likesContainer}>
              <Text style={styles.likesCount} >{likes || 0} me gusta</Text>
              <Heart style={styles.like} active={!!liked} onPress={this.toggleLike} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default withCourseContext(withUser(Comment))

const styles = StyleSheet.create({
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
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  date: {
    color: colors.slateGrey,
    fontSize: 10,
  },
  dateContainer: {
    paddingRight: 10,
    marginRight: 10,
    borderRightColor: colors.slateGrey,
    borderRightWidth: 1,
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
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gunmetal,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
})
