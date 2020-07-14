import { CommentService } from '../services/CommentService'
import { SocketServer } from '../../socket/SocketServer'

export class CommentController {
  constructor(
    private _postService: CommentService,
    private _socket: SocketServer,
  ) {}
}
