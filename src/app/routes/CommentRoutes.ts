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
    this.api.post(Paths.comments.create, [ensureAuth, ...validators.create], this.create)
  }

  public create: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const comment = await this._commentController.create({
          userId: req.userLogged?.id,
          content: req.body.content,
          postId: parseInt(req.params.postId),
        })
        if (comment)
          return res
            .status(statusCodes.CREATE)
            .send(ResponseHandler.build(comment, false))
      }, req, res
    })
}
