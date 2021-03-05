import { AuthenticationError } from 'apollo-server'
import JWT from 'jsonwebtoken'
import { config } from '../config'

export default ({ req }) => {
  const authHeaders = req.headers.authorization

  if (authHeaders) {
    // Bearer
    const token = authHeaders.split('Bearer ')[1]
    try {
      const user = JWT.verify(token, config.SECRET_KEY)

      return user
    } catch (err) {
      throw new AuthenticationError('Invalid/Expired Token')
    }
  }

  throw new Error('Authorization header must be provided')
}
