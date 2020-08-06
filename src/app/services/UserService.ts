import { User } from 'src/database/entities/User'
import { UserMapper } from '../domain/mappers/UserMapper'
import { UserRepository } from '../repositories/UserRepository'
import { UserDTO } from '../domain/dtos/UserDTO'
import { generateUsername } from '../../infrastructure/helpers/username'

export class UserService {
  constructor(
    private _userRepository: UserRepository,
    private _userMapper: UserMapper
  ) {}

  mapToEntity = async (userPayload: UserPayload): Promise<User> =>
    this._userMapper.mapToEntity(userPayload)

  create = async (userEntity: User): Promise<UserDTO> =>
    this._userRepository.save(userEntity).then(async user => {
      const update = await this._userRepository.update(user, {
        username: generateUsername(user.id),
      })

      return this._userMapper.mapToDTO(update)
    })

  getBySocialNetwork = async (query: {
    networkType: string
    networkId: number
  }) =>
    this._userRepository
      .getBySocialNetwork(query)
      .then(user => (user ? this._userMapper.mapToDTO(user) : undefined))

  getById = async (id: number, map = true) =>
    this._userRepository
      .getById(id)
      .then(user => (map ? this._userMapper.mapToDTO(user as User) : user))

  editUsername = async (user: User, username: string) =>
    this._userRepository
      .update(user, { username })
      .then(user => this._userMapper.mapToDTO(user))
}
