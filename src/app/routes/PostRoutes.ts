import { BaseRoutes } from '../../http/BaseRoutes'
import { ResponseHandler, RouteMethod, statusCodes } from '../../http'
import { Response, RequestHandler, Request } from 'express'
import { PostController } from '../controllers/PostController'
import { validators } from '../utils/validators/PostValidators'
import { ensureAuth, publicAuth } from '../../middlewares/AuthenticationMiddle'
import { Endpoints } from './Endpoints'

export class PostRoutes extends BaseRoutes {
  constructor(modulePath: string, private _postController: PostController) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    // Public
    this.api.get(Endpoints.posts.relatedPosts, publicAuth, this.relatedPosts)
    this.api.get(Endpoints.posts.get, publicAuth, this.get)

    // Private
    this.api.use(ensureAuth)
    this.api.post(Endpoints.posts.create, validators.create, this.create)
    this.api.get(Endpoints.posts.list, this.list)
    this.api.post(Endpoints.posts.like, validators.like, this.like)
    this.api.post(Endpoints.posts.unlike, validators.like, this.unlike)
    this.api.delete(Endpoints.posts.delete, validators.deleted, this.delete)
  }

  create: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const { content, color } = req.body
        const post = await this._postController.create({
          userId: req.userLogged?.id,
          content,
          color,
          wallId: parseInt(req.params.wallId),
        })
        if (post)
          return res
            .status(statusCodes.CREATE)
            .send(ResponseHandler.build(post, false))
      },
      req,
      res,
    })

  list: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const { page, perPage } = req.query
        const list = await this._postController.list({
          userId: req.userLogged?.id,
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
        this._postController
          .delete(parseInt(req.params.postId), req.userLogged?.id)
          .then(deleted =>
            res
              .status(statusCodes.OK)
              .send(ResponseHandler.build(deleted, false))
          ),
      req,
      res,
    })

  get: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._postController
          .get(parseInt(req.params.postId), req.userLogged?.id)
          .then(post =>
            res.status(statusCodes.OK).send(ResponseHandler.build(post, false))
          ),
      req,
      res,
    })

  relatedPosts: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const { page, perPage } = req.query
        const relatedPosts = await this._postController.relatedPosts({
          page: page as any,
          perPage: perPage as any,
        })
        if (relatedPosts)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(relatedPosts, false))
      },
      req,
      res,
    })

  like: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._postController
          .like(parseInt(req.params.postId), req.userLogged?.id)
          .then(liked =>
            res.status(statusCodes.OK).send(ResponseHandler.build(liked, false))
          ),
      req,
      res,
    })

  unlike: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._postController
          .unlike(parseInt(req.params.postId), req.userLogged?.id)
          .then(unlike =>
            res
              .status(statusCodes.OK)
              .send(ResponseHandler.build(unlike, false))
          ),
      req,
      res,
    })
}
