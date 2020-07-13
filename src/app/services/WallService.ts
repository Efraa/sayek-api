import { Wall } from 'src/database/entities/Wall'
import { WallMapper } from '../domain/mappers/WallMapper'
import { WallRepository } from '../repositories/WallRepository'
import { WallDTO } from '../domain/dtos/WallDTO'
import { UserMapper } from '../domain/mappers/UserMapper'

export class WallService {
  constructor(
    private _wallRepository: WallRepository,
    private _wallMapper: WallMapper,
    private _userMapper: UserMapper,
  ) {}

  mapToEntity = async (wallPayload: any): Promise<Wall> =>
    await this._wallMapper.mapToEntity(wallPayload)

  create = async (wallEntity: Wall): Promise<WallDTO> =>
    await this._wallRepository.save(wallEntity)
      .then(wall => this._wallMapper.mapToDTO({
        ...wall,
        members: this._userMapper.mapListToDTO(wall.members) as any[]
      }))
}
