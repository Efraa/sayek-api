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
      .select('wall.id')
      .getOne()

  join = async (wallId: number, memberId: number) =>
    await this.repo.createQueryBuilder()
      .relation(Wall, 'members')
      .of(wallId)
      .add(memberId)
      .then(() => ({ wallId, memberId }))
      .catch(() => undefined)

  unjoin = async (wallId: number, memberId: number) =>
    await this.repo.createQueryBuilder()
      .relation(Wall, 'members')
      .of(wallId)
      .remove(memberId)
      .then(() => ({ wallId, memberId }))
      .catch(() => undefined)

  list = async (query: {
    page: number,
    perPage: number,
    userId: number,
  }) => {
    const { perPage, page, userId } = query
    const [rows, count] = await this.repo.createQueryBuilder('wall')
      .leftJoinAndSelect('wall.members', 'member')
      .where('member.id = :userId', { userId })
      .skip(((perPage * page) - perPage))
      .take(perPage)
      .orderBy('wall.id', 'DESC')
      .getManyAndCount()

    return {
      rows,
      all: count,
      pages: Math.ceil(count / perPage),
    }
  }

  get = async (id: number) => await this.repo.createQueryBuilder('wall')
    .loadRelationCountAndMap('wall.members', 'wall.members')
    .where('wall.id = :id', { id })
    .getOne()
}
