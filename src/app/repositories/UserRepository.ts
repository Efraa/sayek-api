import { Repository, getRepository } from 'typeorm'
import { User } from '../../database/entities/User'

export class UserRepository {
  private repo: Repository<User>

  constructor() {
    this.repo = getRepository(User)
  }

  getById = async (id: number) => this.repo.findOne({ id })

  create = async (payload: UserPayload) => this.repo.create(payload)

  save = async (user: User) => this.repo.save(user)

  getBySocialNetwork = async (where: {
    networkType: string
    networkId: number
  }) => this.repo.findOne({ where })

  update = async (user: User, data: any) => {
    const updated = this.repo.merge(user, data)
    return this.save(updated)
  }
}
