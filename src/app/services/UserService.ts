import { User } from 'src/database/entities/User'
import { ErrorHandler, statusCodes } from '../../http'
import { UserMapper } from '../domain/mappers/UserMapper'
import { UserRepository } from '../repositories/UserRepository'
import { UserDTO } from '../domain/dtos/UserDTO'

export class UserService {
  constructor(
    private _userRepository: UserRepository,
    private _userMapper: UserMapper,
  ) {}

  async getAll(query: {
    userId: number,
    perPage?: number,
    page?: number,
  }): Promise<UserDTO[]> {
    return this._userRepository.getAll()
  }
}
