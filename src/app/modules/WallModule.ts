import { WallRepository } from '../repositories/WallRepository'
import { WallMapper } from '../domain/mappers/WallMapper'
import { WallService } from '../services/WallService'
import { WallController } from '../controllers/WallController'
import { userModule } from './UserModule'
import { postModule } from './PostModule'
import { socket } from '../../server'

export class WallModule {
  private _repository: WallRepository
  private _mapper: WallMapper
  private _service: WallService
  private _controller: WallController

  get repository(): WallRepository {
    return !this._repository ?
      (this._repository = new WallRepository())
    : this._repository
  }

  get mapper(): WallMapper {
    return !this._mapper ?
      (this._mapper = new WallMapper(this.repository))
      : this._mapper
  }

  get service(): WallService {
    return !this._service ?
      (this._service = new WallService(
        this.repository,
        this.mapper,
        postModule.service,
      )) : this._service
  }

  get controller(): WallController {
    return !this._controller ?
      (this._controller = new WallController(this.service, userModule.service, socket))
      : this._controller
  }
}

export const wallModule = new WallModule()
