import { BaseRoutes } from '../../http/BaseRoutes'
import { ResponseHandler, RouteMethod, statusCodes } from '../../http'
import { Response, RequestHandler, Request } from 'express'
import { PostController } from '../controllers/PostController'
import { validators } from '../utils/validators/PostValidators'
import { ensureAuth } from '../../middlewares/AuthenticationMiddle'
import { publicAuth } from '../../middlewares/publicAuthMiddle'
import { Paths } from './Paths'


export class PostRoutes extends BaseRoutes {

  constructor(modulePath: string, private _postController: PostController) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    // Public
    this.api.use(publicAuth)
    this.api.get(Paths.posts.relatedPosts, this.relatedPosts)
    this.api.get(Paths.posts.get, this.get)

    // Private
    this.api.use(ensureAuth)
    this.api.post(Paths.posts.create, validators.create, this.create)
    this.api.get(Paths.posts.list, this.list)
    this.api.post(Paths.posts.like, validators.like, this.like)
    this.api.post(Paths.posts.unlike, validators.like, this.unlike)
    this.api.delete(Paths.posts.delete, validators.deleted, this.delete)
  }

  public create: RequestHandler = (req: Request, res: Response) =>
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
      }, req, res
    })

  public list: RequestHandler = (req: Request, res: Response) =>
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
      }, req, res
    })

  public delete: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const { postId } = req.params
        const deleted = await this._postController.delete(parseInt(postId), req.userLogged?.id)
        if (deleted)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(deleted, false))
      }, req, res
    })

  public get: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const post = await this._postController.get(parseInt(req.params.postId), req.userLogged?.id)
        if (post)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(post, false))
      }, req, res
    })

  public relatedPosts: RequestHandler = (req: Request, res: Response) =>
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
      }, req, res
    })

  public like: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const liked = await this._postController.like(parseInt(req.params.postId), req.userLogged?.id)
        if (liked)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(liked, false))
      }, req, res
    })

  public unlike: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const unlike = await this._postController.unlike(parseInt(req.params.postId), req.userLogged?.id)
        if (unlike)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(unlike, false))
      }, req, res
    })
}
