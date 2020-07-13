import { check } from 'express-validator'
import { WallMessages } from '../messages/WallMessages'

const { VALIDATOR } = WallMessages

const create = [
  check('name', VALIDATOR.NAME)
    .isLength({
      min: 2
    })
]

export const validators = { create }
