import { Repository, getRepository } from 'typeorm'
import { User } from '../../database/entities/User'

export class UserRepository {
  private repo: Repository<User>

  constructor() {
    this.repo = getRepository(User)
  }

  getById = async (id: number) => await this.repo.findOne({ id })

  create = async (payload: UserPayload) => this.repo.create(payload)

  save = async (user: User) => await this.repo.save(user)

  getBySocialNetwork = async (where: { networkType: string, networkId: number }) =>
    await this.repo.findOne({ where })
}
