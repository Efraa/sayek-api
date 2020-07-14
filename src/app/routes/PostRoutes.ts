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
  }

  public create: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const { content, color, wallId } = req.body
        const post = await this._postController.create({
          userId: req.userLogged?.id,
          content,
          color,
          wallId,
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
}
