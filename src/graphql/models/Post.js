
import { model, Schema } from 'mongoose'

const postSchema = new Schema({
  body: String,
  email: String,
  createdAt: String,
  username: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
      likes: [
        {
          username: String,
          createdAt: String
        }
      ]
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

export const Post = model('Post', postSchema)
