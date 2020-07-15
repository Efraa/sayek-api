import { BaseRoutes } from '../../http/BaseRoutes'
import { ResponseHandler, RouteMethod, statusCodes } from '../../http'
import { Response, RequestHandler, Request } from 'express'
import { PostController } from '../controllers/PostController'
import { validators } from '../utils/validators/PostValidators'
import { ensureAuth } from '../../middlewares/AuthenticationMiddle'
import { Paths } from './Paths'


export class PostRoutes extends BaseRoutes {

  constructor(modulePath: string, private _postController: PostController) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    this.api.post(Paths.posts.create, [ensureAuth, ...validators.create], this.create)
    this.api.get(Paths.posts.list, ensureAuth, this.list)
    this.api.delete(Paths.posts.delete, [ensureAuth, ...validators.deleted], this.delete)
    this.api.get(Paths.posts.get, ensureAuth, this.get)
    this.api.get(Paths.posts.relatedPosts, ensureAuth, this.relatedPosts)
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
        const post = await this._postController.get(parseInt(req.params.postId))
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
          userId: req.userLogged?.id,
          page: page as any,
          perPage: perPage as any,
        })
        if (relatedPosts)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(relatedPosts, false))
      }, req, res
    })
}
