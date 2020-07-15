import { CommentService } from '../services/CommentService'
import { SocketServer } from '../../socket/SocketServer'
import sanitizeHtml from 'sanitize-html'

export class CommentController {
  constructor(
    private _commentService: CommentService,
    private _socket: SocketServer,
  ) {}

  create = async (commentPayload: {
    content: string,
    userId: number,
    postId: number,
  }) => await this._commentService.mapToEntity({
    ...commentPayload,
    content: sanitizeHtml(commentPayload.content, {
      allowedTags: [ 'a' ],
      allowedAttributes: {
        'a': [ 'href' ]
      }
    })
  }).then(async comment => await this._commentService.create(comment))
}
