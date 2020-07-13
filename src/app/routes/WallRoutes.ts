import { BaseRoutes } from '../../http/BaseRoutes'
import { ResponseHandler, RouteMethod, statusCodes } from '../../http'
import { Response, RequestHandler, Request } from 'express'
import { WallController } from '../controllers/WallController'
import { validators } from '../utils/validators/WallValidators'
import { ensureAuth } from '../../middlewares/AuthenticationMiddle'
import { Paths } from './Paths'


export class WallRoutes extends BaseRoutes {

  constructor(modulePath: string, private _wallController: WallController) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    this.api.post(Paths.walls.create, [ensureAuth, ...validators.create], this.create)
  }

  public create: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const wall = await this._wallController.create({
          name: req.body.name,
          creatorId: req.userLogged?.id,
        })
        if (wall)
          return res
            .status(statusCodes.CREATE)
            .send(ResponseHandler.build(wall, false))
      }, req, res
    })
}
