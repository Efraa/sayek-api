import { Mapper } from 'ts-simple-automapper'
import { Wall } from '../../../database/entities/Wall'
import { WallRepository } from '../../repositories/WallRepository'
import { WallDTO } from '../dtos/WallDTO'
import { UserMapper } from './UserMapper'

export class WallMapper {
  constructor(
    private _wallRepository: WallRepository,
    private _userMapper: UserMapper,
  ) {}

  public mapToDTO(from: Wall): WallDTO {
    const wallDTO: WallDTO = new Mapper().map(from, new WallDTO())
    wallDTO.members = this._userMapper.mapListToDTO(wallDTO.members)
    return wallDTO
  }

  public mapToEntity = async (from: any): Promise<Wall> =>
    await this._wallRepository.create(from)

  public mapListToDTO(walls: Wall[]): WallDTO[] {
    return walls.map(wall => this.mapToDTO(wall))
  }
}
