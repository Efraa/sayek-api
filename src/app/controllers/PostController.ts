import { PostService } from '../services/PostService'
import sanitizeHtml from 'sanitize-html'

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
    userId: number,
  }) => await this._postService.relatedPosts(query)

  get = async (postId: number) => await this._postService.get(postId)

  delete = async (postId: number, userId: number) =>
    await this._postService.delete(postId, userId)
}
