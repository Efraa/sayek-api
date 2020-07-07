import { check, param } from 'express-validator'
import { UserMessages } from '../messages/UserMessages'

const { VALIDATOR } = UserMessages

// const verifyEmail = [
//   check('email', VALIDATOR.EMAIL)
//     .isEmail()
//     .normalizeEmail({ all_lowercase: true })
// ]

export const validators = {}
