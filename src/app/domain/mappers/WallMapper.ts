import { Mapper } from 'ts-simple-automapper'
import { Wall } from '../../../database/entities/Wall'
import { WallRepository } from '../../repositories/WallRepository'
import { WallDTO } from '../dtos/WallDTO'

export class WallMapper {
  constructor(private _wallRepository: WallRepository) {}

  public mapToDTO(from: Wall): WallDTO {
    const wallDTO: WallDTO = new Mapper().map(from, new WallDTO())
    return wallDTO
  }

  public mapToEntity = async (from: any): Promise<Wall> =>
    await this._wallRepository.create(from)

  public mapListToDTO(walls: Wall[]): WallDTO[] {
    return walls.map(wall => this.mapToDTO(wall))
  }
}
