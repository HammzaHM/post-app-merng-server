export const validatorRegisterInput = ({
  username,
  email,
  password,
  confirmPassword
}) => {
  const errors = {}

  if (username.trim() === '') {
    errors.username = 'Username must not be empty'
  }

  if (email.trim() === '') {
    errors.email = 'email must not be empty'
  } else {
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!email.match(EMAIL_REGEX)) {
      errors.email = 'Email must be in a valid format'
    }
  }

  if (!password || !password.length) {
    errors.password = 'password must not be empty'
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

export const validatorLoginInput = (username, password) => {
  const errors = {}

  if (username.trim() === '') {
    errors.username = 'Username must not be empty'
  }

  if (!password || !password.length) {
    errors.password = 'password must not be empty'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}
