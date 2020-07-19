import { PostService } from '../services/PostService'
import { ErrorHandler, statusCodes } from '../../http'
import sanitizeHtml from 'sanitize-html'
import { PostMessages } from '../utils/messages/PostMessages'

export class PostController {
  constructor(private _postService: PostService) {}

  create = async (wallPayload: {
    content: string,
    userId: number,
    wallId: number,
    color: string,
  }) => await this._postService.mapToEntity({
    ...wallPayload,
    content: sanitizeHtml(wallPayload.content, {
      allowedTags: [ 'a' ],
      allowedAttributes: {
        'a': [ 'href' ]
      }
    })
  }).then(async post => await this._postService.create(post))

  list = async (query: {
    page?: number,
    perPage?: number,
    userId: number,
  }) => await this._postService.list(query)

  relatedPosts = async (query: {
    page?: number,
    perPage?: number,
  }) => await this._postService.relatedPosts(query)

  get = async (postId: number, userId?: number) => await this._postService.get(postId, userId)

  delete = async (postId: number, userId: number) =>
    await this._postService.delete(postId, userId)

  async like(postId: number, userId: number) {
    const liked = await this._postService.like(postId, userId)
    if (!liked)
      throw ErrorHandler.build(statusCodes.BAD_REQUEST, PostMessages.LIKE_ERROR)
    
    return liked
  }

  async unlike(postId: number, userId: number) {
    const unlike = await this._postService.unlike(postId, userId)
    if (!unlike)
      throw ErrorHandler.build(statusCodes.BAD_REQUEST, PostMessages.UNLIKE_ERROR)
    
    return unlike
  }
}
