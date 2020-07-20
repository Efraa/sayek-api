import { Mapper } from 'ts-simple-automapper'
import { Wall } from '../../../database/entities/Wall'
import { WallRepository } from '../../repositories/WallRepository'
import { WallDTO } from '../dtos/WallDTO'

export class WallMapper {
  constructor(private _wallRepository: WallRepository) {}

  mapToDTO(from: Wall): WallDTO {
    const wallDTO: WallDTO = new Mapper().map(from, new WallDTO())
    return wallDTO
  }

  mapToEntity = async (from: any): Promise<Wall> =>
    this._wallRepository.create(from)

  mapListToDTO = (walls: Wall[]): WallDTO[] =>
    walls.map(wall => this.mapToDTO(wall))
}
