import { AuthenticationError, UserInputError } from 'apollo-server'
import { Post } from '../models'
import checkAuth from '../../utils/checkAuth'

export default {
  Mutation: {
    async createComment (_, { postId, body }, context) {
      const { username } = checkAuth(context)
      try {
        const foundPost = await Post.findById(postId)

        if (!foundPost) {
          return new UserInputError('Post Not Found!')
        }

        foundPost.comments.unshift({ body, username, createdAt: new Date().toISOString() })

        const updatedPost = await foundPost.save()

        return updatedPost
      } catch (err) {
        return new UserInputError(err)
      }
    },
    async deleteComment (_, { commentId, postId }, context) {
      try {
        const { username } = checkAuth(context)

        const foundPost = await Post.findById(postId)

        if (!foundPost) {
          throw new UserInputError('Post Not Found!')
        }

        const commentIndex = foundPost.comments.findIndex(({ _id }) => String(_id) === String(commentId))

        const foundComment = foundPost.comments[commentIndex]

        if (!foundComment) {
          throw new UserInputError('Comment Not found')
        }

        if (foundComment.username !== username) {
          throw new AuthenticationError('Forbidden!')
        }

        foundPost.comments.splice(commentId, 1)

        return foundPost.save()
      } catch (error) {
        throw new Error(error)
      }
    },
    async likeComment (_, { postId, commentId }, context) {
      const { username } = checkAuth(context)
      try {
        const foundPost = await Post.findById(postId)

        if (!foundPost) {
          return new UserInputError('Post Not Found!')
        }

        if (foundPost.username !== username) {
          return new AuthenticationError('Forbidden')
        }

        const commentIndex = foundPost.comments.findIndex(comment => comment.id === commentId)

        if (commentIndex === -1) {
          return new UserInputError('Comment Not Found!')
        }

        const comment = foundPost.comments[commentIndex]
        const userLike = comment.likes.find(like => like.username === username)

        if (userLike) {
          comment.likes = comment.likes.filter(like => like.username !== username)
        } else {
          comment.likes.push({ username, createdAt: new Date().toISOString() })
        }

        foundPost.comments[commentIndex] = comment

        return foundPost.save()
      } catch (err) {
        return new UserInputError(err)
      }
    }
  }
}
