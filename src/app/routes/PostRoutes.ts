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
}
