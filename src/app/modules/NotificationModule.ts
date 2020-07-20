import { NotificationRepository } from '../repositories/NotificationRepository'
import { NotificationMapper } from '../domain/mappers/NotificationMapper'
import { NotificationService } from '../services/NotificationService'
import { NotificationController } from '../controllers/NotificationController'
import { socket } from '../../server'

export class NotificationModule {
  private _repository: NotificationRepository
  private _mapper: NotificationMapper
  private _service: NotificationService
  private _controller: NotificationController

  get repository(): NotificationRepository {
    return !this._repository
      ? (this._repository = new NotificationRepository())
      : this._repository
  }

  get mapper(): NotificationMapper {
    return !this._mapper
      ? (this._mapper = new NotificationMapper(this.repository))
      : this._mapper
  }

  get service(): NotificationService {
    return !this._service
      ? (this._service = new NotificationService(this.repository, this.mapper))
      : this._service
  }

  get controller(): NotificationController {
    return !this._controller
      ? (this._controller = new NotificationController(this.service, socket))
      : this._controller
  }
}

export const notificationModule = new NotificationModule()
