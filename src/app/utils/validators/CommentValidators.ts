import { check, param } from 'express-validator'
import { CommentMessages } from '../messages/CommentMessages'

const { VALIDATOR } = CommentMessages

const create = [
  check('content', VALIDATOR.CONTENT).isLength({
    min: 2,
  }),
  param('postId', VALIDATOR.POST_ID).isLength({
    min: 1,
  }),
]

const collections = [
  param('postId', VALIDATOR.POST_ID).isLength({
    min: 1,
  }),
]

const deleted = [
  param('commentId', VALIDATOR.POST_ID).isLength({
    min: 1,
  }),
]

export const validators = { create, collections, deleted }
