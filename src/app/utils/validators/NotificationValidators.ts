import { check, param } from 'express-validator'
import { NotificationMessages } from '../messages/NotificationMessages'

const { VALIDATOR } = NotificationMessages

const create = [
  check('content', VALIDATOR.CONTENT).isLength({
    min: 2,
  }),
]

export const validators = { create }
