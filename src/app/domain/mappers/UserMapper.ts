import { Mapper } from 'ts-simple-automapper'
import { User } from '../../../database/entities/User'
import { UserRepository } from '../../repositories/UserRepository'
import { UserDTO } from '../dtos/UserDTO'

export class UserMapper {
  constructor(private _UserRepository: UserRepository) {}

  public mapToDTO(from: User): UserDTO {
    const userDTO: UserDTO = new Mapper().map(from, new UserDTO())
    return userDTO
  }

  // public mapToEntity = async (from: UserPayload): Promise<User> =>
  //   await this._UserRepository.create(from as User)

  public mapListToDTO(users: User[]): UserDTO[] {
    return users.map(user => this.mapToDTO(user))
  }
}
