import { Repository, getRepository } from 'typeorm'
import { Wall } from '../../database/entities/Wall'

export class WallRepository {
  private repo: Repository<Wall>

  constructor() {
    this.repo = getRepository(Wall)
  }

  create = async (payload: any): Promise<Wall> => this.repo.create(payload as Wall)

  save = async (wall: Wall) => await this.repo.save(wall)
}
