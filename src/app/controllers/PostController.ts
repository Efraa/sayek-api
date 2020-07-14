import { ErrorHandler, statusCodes } from '../../http'
import { PostService } from '../services/PostService'
import { SocketServer } from '../../socket/SocketServer'

export class PostController {
  constructor(
    private _postService: PostService,
    private _socket: SocketServer,
  ) {}

  create = async (wallPayload: {
    content: string,
    userId: number,
    wallId: number,
    color: string,
  }) => await this._postService.mapToEntity(wallPayload)
    .then(async post => await this._postService.create(post))

  list = async (query: {
    page?: number,
    perPage?: number,
    userId: number,
  }) => await this._postService.list(query)
}
