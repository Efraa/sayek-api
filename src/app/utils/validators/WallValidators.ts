import { check, param } from 'express-validator'
import { WallMessages } from '../messages/WallMessages'

const { VALIDATOR } = WallMessages

const create = [
  check('name', VALIDATOR.NAME)
    .isLength({
      min: 2
    })
]

const unjoin = [
  param('wallId', VALIDATOR.ID)
    .isLength({
      min: 1
    })
    .toInt()
    .isInt()
]

export const validators = { create, unjoin }
