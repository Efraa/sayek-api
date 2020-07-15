import { UserRepository } from '../repositories/UserRepository'
import { UserMapper } from '../domain/mappers/UserMapper'
import { UserService } from '../services/UserService'
import { UserController } from '../controllers/UserController'

export class UserModule {
  private _repository: UserRepository
  private _mapper: UserMapper
  private _service: UserService
  private _controller: UserController

  get repository(): UserRepository {
    return !this._repository ?
      (this._repository = new UserRepository())
    : this._repository
  }

  get mapper(): UserMapper {
    return !this._mapper ?
      (this._mapper = new UserMapper(this.repository))
      : this._mapper
  }

  get service(): UserService {
    return !this._service ?
      (this._service = new UserService(
        this.repository,
        this.mapper,
      )) : this._service
  }

  get controller(): UserController {
    return !this._controller ?
      (this._controller = new UserController(this.service))
      : this._controller
  }
}

export const userModule = new UserModule()
