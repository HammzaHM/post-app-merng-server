import { gql } from 'apollo-server'

export const typeDefs = gql`
type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
}

type Comment {
    id: ID!
    body: String!
    username: String!
    likes: [Like]
    createdAt: String
}

type Like {
    id: ID!
    username: String!
    createdAt: String
}

type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    token: String!
    createdAt: String!
}

input RegisterInput {
    username: String!,
    password: String!
    confirmPassword: String!
    email: String!
}

type Query {
    getPosts: [Post] @cacheControl(maxAge: 10)
    getPost(postId: ID!): Post
    getUsers: [User]  @cacheControl(maxAge: 5)
    getUser(userId: ID!): User
}

type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User! 
    createPost(body: String!): Post!
    deletePost(postId:ID!): String!
    likePost(postId: ID!): Post!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likeComment(commentId: ID!, postId: ID!): Post!
}

type Subscription {
    newPost: Post!
}
`
