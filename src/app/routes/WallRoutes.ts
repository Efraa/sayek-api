import { BaseRoutes } from '../../infrastructure/http/BaseRoutes'
import {
  ResponseHandler,
  RouteMethod,
  statusCodes,
} from '../../infrastructure/http'
import { Response, RequestHandler, Request } from 'express'
import { WallController } from '../controllers/WallController'
import { validators } from '../utils/validators/WallValidators'
import {
  isAuthorized,
  isLogged,
} from '../../infrastructure/middlewares/AuthorizedMiddle'
import { Endpoints } from './Endpoints'

export class WallRoutes extends BaseRoutes {
  constructor(modulePath: string, private _wallController: WallController) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    this.api
      .route(Endpoints.walls.collection)
      .get(isAuthorized, this.collection)
      .post([isAuthorized, ...validators.create], this.create)

    this.api
      .route(Endpoints.walls.join)
      .all([isAuthorized, ...validators.leave])
      .post(this.join)
      .delete(this.leave)

    this.api.route(Endpoints.walls.document).get(isLogged, this.get)
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

  collection: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const { page, perPage } = req.query
        const collection = await this._wallController.collection({
          userId: req.userLogged?.id,
          page: page as any,
          perPage: perPage as any,
        })
        if (collection)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(collection, false))
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
