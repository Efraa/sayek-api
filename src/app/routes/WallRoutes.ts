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
    // Private
    this.api.post(
      Endpoints.walls.create,
      [isAuthorized, ...validators.create],
      this.create
    )
    this.api.get(Endpoints.walls.collections, isAuthorized, this.collections)
    this.api.post(
      Endpoints.walls.leave,
      [isAuthorized, ...validators.leave],
      this.leave
    )
    this.api.post(
      Endpoints.walls.join,
      [isAuthorized, ...validators.leave],
      this.join
    )

    // Public
    this.api.get(Endpoints.walls.get, isLogged, this.get)
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

  collections: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const { page, perPage } = req.query
        const collections = await this._wallController.collections({
          userId: req.userLogged?.id,
          page: page as any,
          perPage: perPage as any,
        })
        if (collections)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(collections, false))
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
