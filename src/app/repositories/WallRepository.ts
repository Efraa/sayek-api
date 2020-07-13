import { Repository, getRepository } from 'typeorm'
import { Wall } from '../../database/entities/Wall'

export class WallRepository {
  private repo: Repository<Wall>

  constructor() {
    this.repo = getRepository(Wall)
  }

  getByIdWithMembers = async (id: number) =>
    await this.repo.findOne({ where: { id }, relations: ['members'] })

  getById = async (id: number) => await this.repo.findOne({ id })

  create = async (payload: any): Promise<Wall> => this.repo.create(payload as Wall)

  save = async (wall: Wall) => await this.repo.save(wall)

  memberIsJoined = async (wallId: number, memberId: number) =>
    await this.repo.createQueryBuilder('wall')
      .leftJoinAndSelect('wall.members', 'member')
      .where('wall.id = :wallId', { wallId })
      .andWhere('member.id = :memberId', { memberId })
      .getOne()
}
