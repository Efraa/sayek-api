import { config } from '../../config'
import { Wall } from '../../database/entities/Wall'
import { WallMapper } from '../domain/mappers/WallMapper'
import { WallRepository } from '../repositories/WallRepository'
import { WallDTO } from '../domain/dtos/WallDTO'
import { ErrorHandler, statusCodes } from '../../http'
import { WallMessages } from '../utils/messages/WallMessages'
import { PostService } from './PostService'

export class WallService {
  constructor(
    private _wallRepository: WallRepository,
    private _wallMapper: WallMapper,
    private _postService: PostService
  ) {}

  getById = async (id: number) => this._wallRepository.getById(id)

  getByIdWithMembers = async (id: number) =>
    this._wallRepository.getByIdWithMembers(id)

  mapToEntity = async (wallPayload: any): Promise<Wall> =>
    this._wallMapper.mapToEntity(wallPayload)

  create = async (wallEntity: Wall): Promise<WallDTO> =>
    this._wallRepository
      .save(wallEntity)
      .then(wall => this._wallMapper.mapToDTO(wall))

  leave = async (wallId: number, memberId: number) =>
    this._wallRepository.leave(wallId, memberId)

  join = async (wallId: number, memberId: number) =>
    this._wallRepository.join(wallId, memberId)

  memberIsJoined = async (wallId: number, memberId: number) =>
    this._wallRepository.memberIsJoined(wallId, memberId)

  collections = async (query: {
    userId: number
    page?: number
    perPage?: number
  }) => {
    const { page, perPage, userId } = query
    const options = {
      page: page || config.PAGINATION.PAGE,
      perPage: perPage || config.PAGINATION.PER_PAGE,
      userId,
    }
    const collections = await this._wallRepository.collections(options)

    if (!collections.rows[0])
      throw ErrorHandler.build(
        statusCodes.NOT_FOUND,
        WallMessages.WALL_NOT_FOUND
      )

    return {
      walls: this._wallMapper.mapListToDTO(collections.rows),
      all: collections.all,
      pages: collections.pages,
      nextPage:
        options.page >= collections.pages
          ? false
          : parseInt(options.page as any) + 1,
    }
  }

  get = async (wallId: number, userId?: number) => {
    const { posts, all, pages } = await this._postService.postOnWall({
      wallId,
      userId,
    })
    const wall = await this._wallRepository
      .get(wallId)
      .then(wall => this._wallMapper.mapToDTO(wall as Wall))

    if (!wall)
      throw ErrorHandler.build(
        statusCodes.NOT_FOUND,
        WallMessages.WALL_NOT_FOUND
      )

    return {
      ...wall,
      posts: {
        ...posts,
        all,
        pages,
      },
    }
  }
}
