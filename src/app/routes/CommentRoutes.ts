import { BaseRoutes } from '../../infrastructure/http/BaseRoutes'
import {
  ResponseHandler,
  RouteMethod,
  statusCodes,
} from '../../infrastructure/http'
import { Response, RequestHandler, Request } from 'express'
import { CommentController } from '../controllers/CommentController'
import { validators } from '../utils/validators/CommentValidators'
import { isAuthorized } from '../../infrastructure/middlewares/AuthorizedMiddle'
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
    this.api
      .route(Endpoints.comments.collection)
      .get(validators.collection, this.commentOnPost)
      .post([isAuthorized, ...validators.create], this.create)

    this.api
      .route(Endpoints.comments.document)
      .delete([isAuthorized, ...validators.deleted], this.delete)
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
        const collection = await this._commentController.commentOnPost({
          postId: parseInt(req.params.postId),
          page: page as any,
          perPage: perPage as any,
        })
        if (collection)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(collection, false))
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
