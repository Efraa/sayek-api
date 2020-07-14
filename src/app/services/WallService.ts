import { Wall } from '../../database/entities/Wall'
import { WallMapper } from '../domain/mappers/WallMapper'
import { WallRepository } from '../repositories/WallRepository'
import { WallDTO } from '../domain/dtos/WallDTO'
import { ErrorHandler, statusCodes } from '../../http'
import { WallMessages } from '../utils/messages/WallMessages'
import { PostRepository } from '../repositories/PostRepository'

export class WallService {
  constructor(
    private _wallRepository: WallRepository,
    private _wallMapper: WallMapper,
    private _postRepository: PostRepository,
  ) {}

  getById = async (id: number) =>
    await this._wallRepository.getById(id)

  getByIdWithMembers = async (id: number) =>
    await this._wallRepository.getByIdWithMembers(id)

  mapToEntity = async (wallPayload: any): Promise<Wall> =>
    await this._wallMapper.mapToEntity(wallPayload)

  create = async (wallEntity: Wall): Promise<WallDTO> =>
    await this._wallRepository.save(wallEntity)
      .then(wall => this._wallMapper.mapToDTO(wall))

  unjoin = async (wallId: number, memberId: number) =>
    await this._wallRepository.unjoin(wallId, memberId)

  join = async (wallId: number, memberId: number) =>
    await this._wallRepository.join(wallId, memberId)

  memberIsJoined = async (wallId: number, memberId: number) =>
    await this._wallRepository.memberIsJoined(wallId, memberId)

  list = async (query: {
    userId: number,
    page?: number,
    perPage?: number,
  }) => {
    const { page, perPage, userId } = query
    const list = await this._wallRepository.list({
      page: page || 1,
      perPage: perPage || 12,
      userId
    })

    if (!list.rows[0])
      throw ErrorHandler.build(statusCodes.NOT_FOUND, WallMessages.WALL_NOT_FOUND)

    return {
      walls: this._wallMapper.mapListToDTO(list.rows),
      all: list.all,
      pages: list.pages,
    }
  }

  get = async (wallId: number, memberId: number) => {
    
  }
}
