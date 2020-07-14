import { Post } from 'src/database/entities/Post'
import { PostMapper } from '../domain/mappers/PostMapper'
import { PostRepository } from '../repositories/PostRepository'
import { PostDTO } from '../domain/dtos/PostDTO'
import { ErrorHandler, statusCodes } from '../../http'
import { PostMessages } from '../utils/messages/PostMessages'

export class PostService {
  constructor(
    private _postRepository: PostRepository,
    private _postMapper: PostMapper,
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
      page: page || 1,
      perPage: perPage || 12,
      wallId,
    })

    if (!list.rows[0])
      throw ErrorHandler.build(statusCodes.NOT_FOUND, PostMessages.POST_NOT_FOUND)

    return {
      walls: this._postMapper.mapListToDTO(list.rows),
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
      page: page || 1,
      perPage: perPage || 12,
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
}
