import { Repository, FindManyOptions, getRepository } from 'typeorm'
import { User } from '../../database/entities/User'

export class UserRepository {
  private repo: Repository<User>

  constructor() {
    this.repo = getRepository(User)
  }

  public getAll = async (query: FindManyOptions<User> = {}): Promise<User[]> =>
    await this.repo.find({
      cache: true
    })
}