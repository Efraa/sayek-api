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
    this.api.use(ensureAuth)
    this.api.post(Paths.walls.create, validators.create, this.create)
    this.api.post(Paths.walls.unjoin, validators.unjoin, this.unjoin)
    this.api.post(Paths.walls.join, validators.unjoin, this.join)
    this.api.get(Paths.walls.list, this.list)
    this.api.get(Paths.walls.get, this.get)
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

  public list: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const { page, perPage } = req.query
        const list = await this._wallController.list({
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

  public get: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const wall = await this._wallController.get(parseInt(req.params.wallId), req.userLogged?.id)
        if (wall)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(wall, false))
      }, req, res
    })
}
