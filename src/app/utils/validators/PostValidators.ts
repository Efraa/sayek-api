import { check, param } from 'express-validator'
import { PostMessages } from '../messages/PostMessages'

const { VALIDATOR } = PostMessages

const create = [
  check('content', VALIDATOR.CONTENT)
    .isLength({
      min: 2
    }),
  check('color', VALIDATOR.COLOR)
    .isLength({
      min: 1
    }),
  check('wallId', VALIDATOR.WALL_ID)
    .isLength({
      min: 1
    })
]

const deleted = [
  check('postId', VALIDATOR.POST_ID)
    .isLength({
      min: 1
    })
]

export const validators = { create, deleted }
