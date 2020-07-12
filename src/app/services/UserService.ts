import { User } from 'src/database/entities/User'
import { UserMapper } from '../domain/mappers/UserMapper'
import { UserRepository } from '../repositories/UserRepository'
import { UserDTO } from '../domain/dtos/UserDTO'

export class UserService {
  constructor(
    private _userRepository: UserRepository,
    private _userMapper: UserMapper,
  ) {}

  mapToEntity = async (userPayload: UserPayload): Promise<User> =>
    await this._userMapper.mapToEntity(userPayload)

  create = async (userEntity: User): Promise<UserDTO> =>
    await this._userRepository.save(userEntity)
      .then(user => this._userMapper.mapToDTO(user))

  getBySocialNetwork = async (query: { networkType: string, networkId: number }) =>
    await this._userRepository.getBySocialNetwork(query)
      .then(user => user ? this._userMapper.mapToDTO(user) : undefined)
}
