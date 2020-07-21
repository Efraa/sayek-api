import { BaseRoutes } from '../../http/BaseRoutes'
import { ResponseHandler, RouteMethod, statusCodes } from '../../http'
import { Response, RequestHandler, Request } from 'express'
import { CommentController } from '../controllers/CommentController'
import { validators } from '../utils/validators/CommentValidators'
import { isAuthorized } from '../../middlewares/AuthorizedMiddle'
import { Endpoints } from './Endpoints'

export class CommentRoutes extends BaseRoutes {
  constructor(
    modulePath: string,
    private _commentController: CommentController
  ) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    // Public
    this.api.get(Endpoints.comments.list, validators.list, this.commentOnPost)

    this.api.use(isAuthorized)
    this.api.post(Endpoints.comments.create, validators.create, this.create)
    this.api.delete(Endpoints.comments.delete, validators.deleted, this.delete)
  }

  create: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._commentController
          .create({
            userId: req.userLogged?.id,
            content: req.body.content,
            postId: parseInt(req.params.postId),
          })
          .then(comment =>
            res
              .status(statusCodes.CREATE)
              .send(ResponseHandler.build(comment, false))
          ),
      req,
      res,
    })

  commentOnPost: RequestHandler = (req: Request, res: Response) =>
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
      },
      req,
      res,
    })

  delete: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._commentController
          .delete(parseInt(req.params.commentId), req.userLogged?.id)
          .then(deleted =>
            res
              .status(statusCodes.OK)
              .send(ResponseHandler.build(deleted, false))
          ),
      req,
      res,
    })
}
