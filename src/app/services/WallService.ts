import { Wall } from 'src/database/entities/Wall'
import { WallMapper } from '../domain/mappers/WallMapper'
import { WallRepository } from '../repositories/WallRepository'
import { WallDTO } from '../domain/dtos/WallDTO'
import { UserMapper } from '../domain/mappers/UserMapper'

export class WallService {
  constructor(
    private _wallRepository: WallRepository,
    private _wallMapper: WallMapper,
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

  unjoin = async (wall: Wall, memberId: number): Promise<WallDTO> => {
    wall.members = wall.members.filter(member => member.id !== memberId)
    return await this._wallRepository.save(wall)
      .then(wall => this._wallMapper.mapToDTO(wall))
  } 
}
