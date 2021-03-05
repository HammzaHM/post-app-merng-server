import comments from './comments'
import postsResolvers from './posts'
import usersResolvers from './users'

export const resolvers = {
  Post: {
    commentCount: ({ comments }) => comments.length,
    likeCount: ({ likes }) => likes.length
  },
  Query: {
    ...postsResolvers.Query,
    ...usersResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...comments.Mutation
  },
  Subscription: {
    ...postsResolvers.Subscription
  }
}
