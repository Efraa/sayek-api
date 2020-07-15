import { config } from '../../config'
import { Post } from 'src/database/entities/Post'
import { PostMapper } from '../domain/mappers/PostMapper'
import { PostRepository } from '../repositories/PostRepository'
import { PostDTO } from '../domain/dtos/PostDTO'
import { ErrorHandler, statusCodes } from '../../http'
import { PostMessages } from '../utils/messages/PostMessages'
import { CommentService } from './CommentService'

export class PostService {
  constructor(
    private _postRepository: PostRepository,
    private _postMapper: PostMapper,
    private _commentsService: CommentService,
  ) {}

  mapToEntity = async (postPayload: any): Promise<Post> =>
    await this._postMapper.mapToEntity(postPayload)

  create = async (postEntity: Post): Promise<PostDTO> =>
    await this._postRepository.save(postEntity)
      .then(post => this._postMapper.mapToDTO(post))

  getById = async (id: number) =>
    await this._postRepository.getById(id)

  postOnWall = async (query: {
    wallId: number,
    page?: number,
    perPage?: number,
  }) => {
    const { page, perPage, wallId } = query
    const list = await this._postRepository.postOnWall({
      page: page || config.PAGINATION.PAGE,
      perPage: perPage || config.PAGINATION.PER_PAGE,
      wallId,
    })

    if (!list.rows[0])
      throw ErrorHandler.build(statusCodes.NOT_FOUND, PostMessages.POST_NOT_FOUND)

    return {
      posts: this._postMapper.mapListToDTO(list.rows),
      all: list.all,
      pages: list.pages,
    }
  }

  list = async (query: {
    userId: number,
    page?: number,
    perPage?: number,
  }) => {
    const { page, perPage, userId } = query
    const list = await this._postRepository.list({
      page: page || config.PAGINATION.PAGE,
      perPage: perPage || config.PAGINATION.POST_PER_PAGE,
      userId,
    })

    if (!list.rows[0])
      throw ErrorHandler.build(statusCodes.NOT_FOUND, PostMessages.POST_NOT_FOUND)

    return {
      posts: this._postMapper.mapListToDTO(list.rows),
      all: list.all,
      pages: list.pages,
    }
  }

  get = async (postId: number) => {
    const comments = await this._commentsService.commentOnPost({ postId })
    const post = await this._postRepository.get(postId)
      .then(post => this._postMapper.mapToDTO(post as Post))

    if (!post)
      throw ErrorHandler.build(statusCodes.NOT_FOUND, PostMessages.POST_NOT_FOUND)
    
    return {
      ...post,
      ...comments,
    }
  }

  relatedPosts = async (query: {
    userId: number,
    page?: number,
    perPage?: number,
  }) => {
    const { page, perPage, userId } = query
    const list = await this._postRepository.relatedPosts({
      page: page || config.PAGINATION.PAGE,
      perPage: perPage || config.PAGINATION.PER_PAGE,
      userId,
    })

    if (!list.rows[0])
      throw ErrorHandler.build(statusCodes.NOT_FOUND, PostMessages.POST_NOT_FOUND)

    return {
      posts: this._postMapper.mapListToDTO(list.rows),
      all: list.all,
      pages: list.pages,
    }
  }

  delete = async (postId: number, userId: number) =>
    await this._postRepository.delete(postId, userId)
      .then(() => ({ postId, userId }))
}
