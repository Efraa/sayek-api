import { BaseRoutes } from '../../infrastructure/http/BaseRoutes'
import {
  ResponseHandler,
  RouteMethod,
  statusCodes,
  ErrorHandler,
} from '../../infrastructure/http'
import { Response, RequestHandler, Request } from 'express'
import { UserController } from '../controllers/UserController'
import {
  facebookMiddle,
  googleMiddle,
} from '../../infrastructure/middlewares/passport'
import { Endpoints } from './Endpoints'
import { AuthToken } from '../../infrastructure/helpers'
import { UserMessages } from '../utils/messages/UserMessages'
import { validators } from '../utils/validators/UserValidators'
import { isAuthorized } from '../../infrastructure/middlewares/AuthorizedMiddle'

export class UserRoutes extends BaseRoutes {
  constructor(modulePath: string, private _userController: UserController) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    this.api.get(Endpoints.users.authFacebook, facebookMiddle.authenticate)
    this.api.get(Endpoints.users.authGoogle, googleMiddle.authenticate)
    this.api.get(
      `${Endpoints.users.authFacebook}/cb`,
      facebookMiddle.authenticateCallBack(),
      this.authCallback
    )
    this.api.get(
      `${Endpoints.users.authGoogle}/cb`,
      googleMiddle.authenticateCallBack(),
      this.authCallback
    )
    this.api.post(Endpoints.users.refreshToken, this.refreshToken)

    this.api.use(isAuthorized)
    this.api.post(Endpoints.users.logout, this.logout)
    this.api.put(Endpoints.users.update, validators.edit, this.editUsername)
  }

  authCallback: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._userController
          .authCallback(req.user, req.query.state as string)
          .then(({ callbackURI, token }) => {
            AuthToken.sendRefreshToken(res, token)
            return res.redirect(callbackURI)
          }),
      req,
      res,
    })

  editUsername: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._userController
          .editUsername(req.userLogged?.id, req.body.username)
          .then(user =>
            res.status(statusCodes.OK).send(ResponseHandler.build(user, false))
          ),
      req,
      res,
    })

  refreshToken: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._userController
          .refreshToken(req.cookies._cxtk)
          .then(({ token, refreshToken }) => {
            AuthToken.sendRefreshToken(res, refreshToken)
            return res
              .status(statusCodes.OK)
              .send(ResponseHandler.build({ token }, false))
          }),
      req,
      res,
    })

  logout: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        if (!req.cookies._cxtk)
          throw ErrorHandler.build(
            statusCodes.BAD_REQUEST,
            UserMessages.NOT_LOGGUED
          )

        AuthToken.destroyRefreshToken(res)
        return res
          .status(statusCodes.OK)
          .send(ResponseHandler.build(UserMessages.UNLOGGED))
      },
      req,
      res,
    })
}
