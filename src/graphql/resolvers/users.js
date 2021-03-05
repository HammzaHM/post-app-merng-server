import bcrypt from 'bcryptjs'
import { UserInputError } from 'apollo-server'

import { validatorLoginInput, validatorRegisterInput } from '../../utils/validators'
import { User } from '../models'
import { generateToken } from '../../utils/helpers'

export default {
  Query: {
    async getUsers () {
      const users = await User.find()

      return users
    }
  },
  Mutation: {
    register: async (_, { registerInput: { email, password, confirmPassword, username } }) => {
      // Validate Data User Data

      const { valid, errors } = validatorRegisterInput({ email, confirmPassword, username, password })

      try {
        if (!valid) {
          return new UserInputError('Errors', { errors })
        }

        const user = await User.findOne({ username })

        if (user) {
          throw new UserInputError('This user is already exists', {
            errors: {
              username: 'This username or email is taken'
            }
          })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new User({
          email,
          username,
          password: hashedPassword,
          createdAt: new Date().toISOString()
        })

        const createdUser = await newUser.save()

        const token = generateToken(createdUser)

        return {
          ...createdUser._doc,
          id: createdUser._id,
          token
        }
      } catch (err) {
        throw new UserInputError(err)
      }
    },
    login: async (_, { username, password }) => {
      try {
        const { valid, errors } = validatorLoginInput(username, password)
        if (!valid) {
          return new UserInputError('Errors', { errors })
        }

        const user = await User.findOne({ username })

        if (!user) {
          errors.general = 'User not found'
          throw new UserInputError('User Not Found', { errors })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
          errors.general = 'Wrong Credientials'
          throw new UserInputError('Wrong Credientials', { errors })
        }

        const token = generateToken(user) 

        return {
          ...user._doc,
          id: user._id,
          token
        }
      } catch (error) {
        return new UserInputError(error)
      }
    }
  }
}
