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
    this.api.get(Paths.comments.list, [ensureAuth, ...validators.list], this.commentOnPost)
    this.api.delete(Paths.comments.delete, [ensureAuth, ...validators.deleted], this.delete)
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
  
  public commentOnPost: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const { page, perPage } = req.query
        const list = await this._commentController.commentOnPost({
          postId: parseInt(req.params.postId),
          page: page as any,
          perPage: perPage as any,
        })
        if (list)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(list, false))
      }, req, res
    })

  public delete: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const { commentId } = req.params
        const deleted = await this._commentController.delete(parseInt(commentId), req.userLogged?.id)
        if (deleted)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(deleted, false))
      }, req, res
    })
}
