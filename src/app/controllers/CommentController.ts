import { CommentService } from '../services/CommentService'
import { SocketServer } from '../../infrastructure/socket/SocketServer'
import sanitizeHtml from 'sanitize-html'

export class CommentController {
  constructor(
    private _commentService: CommentService,
    private _socket: SocketServer
  ) {}

  create = async (commentPayload: {
    content: string
    userId: number
    postId: number
  }) =>
    this._commentService
      .mapToEntity({
        ...commentPayload,
        content: sanitizeHtml(commentPayload.content, {
          allowedTags: ['a'],
          allowedAttributes: {
            a: ['href'],
          },
        }),
      })
      .then(async comment => this._commentService.create(comment))

  commentOnPost = async (query: {
    page?: number
    perPage?: number
    postId: number
  }) => this._commentService.commentOnPost(query)

  delete = async (commentId: number, userId: number) =>
    this._commentService.delete(commentId, userId)
}
