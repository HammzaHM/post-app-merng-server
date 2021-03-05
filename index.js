import { ApolloServer, PubSub } from 'apollo-server'
import mongoose from 'mongoose'

import { config } from './src/config'
import { resolvers, typeDefs } from './src/graphql'
import 'apollo-cache-control'

const myPlugin = {
  serverWillStart (requestContext) {
    console.log('apollo server has been started!!!')
  },
  requestDidStart (requestContext) {
    console.log('Request started! Query:\n', requestContext.request.query)
  }
}

const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
  plugins: [myPlugin],
  introspection: !!process.env.INTROSPECTION
})

const PORT = process.env.PORT || 5000

(async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('%cMongoDB Connected!', 'color: #1c87c9; font-size: 18px')

    const { url } = await server.listen({ port: PORT })

    console.log(`Server running at ${url}`)
  } catch (err) {
    console.error(err)
  }
})()
