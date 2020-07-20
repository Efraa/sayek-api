import { PostRepository } from '../repositories/PostRepository'
import { PostMapper } from '../domain/mappers/PostMapper'
import { PostService } from '../services/PostService'
import { PostController } from '../controllers/PostController'
import { commentModule } from './CommentModule'

export class PostModule {
  private _repository: PostRepository
  private _mapper: PostMapper
  private _service: PostService
  private _controller: PostController

  get repository(): PostRepository {
    return !this._repository
      ? (this._repository = new PostRepository())
      : this._repository
  }

  get mapper(): PostMapper {
    return !this._mapper
      ? (this._mapper = new PostMapper(this.repository))
      : this._mapper
  }

  get service(): PostService {
    return !this._service
      ? (this._service = new PostService(
          this.repository,
          this.mapper,
          commentModule.service
        ))
      : this._service
  }

  get controller(): PostController {
    return !this._controller
      ? (this._controller = new PostController(this.service))
      : this._controller
  }
}

export const postModule = new PostModule()
