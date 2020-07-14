import { CommentRepository } from '../repositories/CommentRepository'
import { CommentMapper } from '../domain/mappers/CommentMapper'
import { CommentService } from '../services/CommentService'
import { CommentController } from '../controllers/CommentController'
import { socket } from '../../server'

export class CommentModule {
  private _repository: CommentRepository
  private _mapper: CommentMapper
  private _service: CommentService
  private _controller: CommentController

  get repository(): CommentRepository {
    return !this._repository ?
      (this._repository = new CommentRepository())
    : this._repository
  }

  get mapper(): CommentMapper {
    return !this._mapper ?
      (this._mapper = new CommentMapper(this.repository))
      : this._mapper
  }

  get service(): CommentService {
    return !this._service ?
      (this._service = new CommentService(
        this.repository,
        this.mapper,
      )) : this._service
  }

  get controller(): CommentController {
    return !this._controller ?
      (this._controller = new CommentController(this.service, socket))
      : this._controller
  }
}

export const commentModule = new CommentModule()
