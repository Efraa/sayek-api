import { check } from 'express-validator'
import { UserMessages } from '../messages/UserMessages'

const { VALIDATOR } = UserMessages

const edit = [
  check('username', VALIDATOR.USERNAME)
    .isLength({
      min: 3
    })
]

export const validators = { edit }
