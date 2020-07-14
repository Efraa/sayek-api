import { BaseRoutes } from '../../http/BaseRoutes'
import { ResponseHandler, RouteMethod, statusCodes } from '../../http'
import { Response, RequestHandler, Request } from 'express'
import { CommentController } from '../controllers/CommentController'
import { validators } from '../utils/validators/CommentValidators'
import { ensureAuth } from '../../middlewares/AuthenticationMiddle'
import { Paths } from './Paths'


export class CommentRoutes extends BaseRoutes {

  constructor(modulePath: string, private _commentController: CommentController) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    // this.api.post(Paths.comments.create, [ensureAuth, ...validators.create], this.create)
  }
}
