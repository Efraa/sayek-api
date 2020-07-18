import { BaseRoutes } from '../../http/BaseRoutes'
import { ResponseHandler, RouteMethod, statusCodes, ErrorHandler } from '../../http'
import { Response, RequestHandler, Request } from 'express'
import { UserController } from '../controllers/UserController'
import { facebookMiddle, googleMiddle } from '../../middlewares/passport'
import { Paths } from './Paths'
import { AuthToken } from '../../helpers'
import { UserMessages } from '../utils/messages/UserMessages'

export class UserRoutes extends BaseRoutes {

  constructor(modulePath: string, private _userController: UserController) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    this.api.get(Paths.users.authFacebook, facebookMiddle.authenticate)
    this.api.get(Paths.users.authGoogle, googleMiddle.authenticate)
    this.api.get(`${Paths.users.authFacebook}/cb`, facebookMiddle.authenticateCallBack(), this.authCallback)
    this.api.get(`${Paths.users.authGoogle}/cb`, googleMiddle.authenticateCallBack(), this.authCallback)
    this.api.post(Paths.users.refreshToken, this.refreshToken)
    this.api.post(Paths.users.logout, this.logout)
  }

  public authCallback: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        if (req.user) {
          await this._userController.authCallback(req.user, req.query.state as string)
            .then(({ callbackURI, token }) => {
              AuthToken.sendRefreshToken(res, token)
              return res.redirect(callbackURI)
            })
        }
      }, req, res
    })

  public refreshToken: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => await this._userController.refreshToken(req.cookies._cxtk)
        .then(({ token, refreshToken }) => {
          AuthToken.sendRefreshToken(res, refreshToken)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build({ token }, false))
        }), req, res
    })

  public logout: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        if (!req.cookies._cxtk)
          throw ErrorHandler.build(statusCodes.BAD_REQUEST, UserMessages.NOT_LOGGUED)
        
        AuthToken.sendRefreshToken(res, '')
        return res
          .status(statusCodes.OK)
          .send(ResponseHandler.build(UserMessages.UNLOGGED))
      }, req, res
    })
}
