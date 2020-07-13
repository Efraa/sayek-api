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
    this.api.post(Paths.walls.unjoin, [ensureAuth, ...validators.unjoin], this.unjoin)
    this.api.post(Paths.walls.join, [ensureAuth, ...validators.unjoin], this.join)
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

  public unjoin: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const wall = await this._wallController.unjoin(parseInt(req.params.wallId), req.userLogged?.id)
        if (wall)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(wall, false))
      }, req, res
    })

  public join: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const wall = await this._wallController.join(parseInt(req.params.wallId), req.userLogged?.id)
        if (wall)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(wall, false))
      }, req, res
    })
}
