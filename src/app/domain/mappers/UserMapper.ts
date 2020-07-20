import { Mapper } from 'ts-simple-automapper'
import { User } from '../../../database/entities/User'
import { UserRepository } from '../../repositories/UserRepository'
import { UserDTO } from '../dtos/UserDTO'

export class UserMapper {
  constructor(private _userRepository: UserRepository) {}

  mapToDTO(from: User): UserDTO {
    const userDTO: UserDTO = new Mapper().map(from, new UserDTO())
    return userDTO
  }

  mapToEntity = async (from: UserPayload): Promise<User> =>
    this._userRepository.create(from)

  mapListToDTO = (users: User[]): UserDTO[] =>
    users.map(user => this.mapToDTO(user))
}
