import { BaseRoutes } from '../../http/BaseRoutes'
import { ResponseHandler, RouteMethod, statusCodes } from '../../http'
import { Response, RequestHandler, Request } from 'express'
import { WallController } from '../controllers/WallController'
import { validators } from '../utils/validators/WallValidators'
import { isAuthorized, isLogged } from '../../middlewares/AuthorizedMiddle'
import { Endpoints } from './Endpoints'

export class WallRoutes extends BaseRoutes {
  constructor(modulePath: string, private _wallController: WallController) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    // Public
    this.api.get(Endpoints.walls.get, isLogged, this.get)

    // Private
    this.api.use(isAuthorized)
    this.api.post(Endpoints.walls.create, validators.create, this.create)
    this.api.post(Endpoints.walls.leave, validators.leave, this.leave)
    this.api.post(Endpoints.walls.join, validators.leave, this.join)
    this.api.get(Endpoints.walls.list, this.list)
  }

  create: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._wallController
          .create({
            name: req.body.name,
            creatorId: req.userLogged?.id,
          })
          .then(wall =>
            res
              .status(statusCodes.CREATE)
              .send(ResponseHandler.build(wall, false))
          ),
      req,
      res,
    })

  leave: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._wallController
          .leave(parseInt(req.params.wallId), req.userLogged?.id)
          .then(wall =>
            res.status(statusCodes.OK).send(ResponseHandler.build(wall, false))
          ),
      req,
      res,
    })

  join: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._wallController
          .join(parseInt(req.params.wallId), req.userLogged?.id)
          .then(wall =>
            res.status(statusCodes.OK).send(ResponseHandler.build(wall, false))
          ),
      req,
      res,
    })

  list: RequestHandler = (req: Request, res: Response) =>
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
      },
      req,
      res,
    })

  get: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._wallController
          .get(parseInt(req.params.wallId), req.userLogged?.id)
          .then(wall =>
            res.status(statusCodes.OK).send(ResponseHandler.build(wall, false))
          ),
      req,
      res,
    })
}
