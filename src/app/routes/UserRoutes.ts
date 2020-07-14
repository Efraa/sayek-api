import { config } from '../../config'
import { BaseRoutes } from '../../http/BaseRoutes'
import { RouteMethod } from '../../http'
import { Response, RequestHandler, Request } from 'express'
import { UserController } from '../controllers/UserController'
import { facebookMiddle, googleMiddle } from '../../middlewares/passport'
import { Paths } from './Paths'

export class UserRoutes extends BaseRoutes {

  constructor(modulePath: string, private _userController: UserController) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    this.api.get(Paths.users.authFacebook, facebookMiddle.authenticate())
    this.api.get(`${Paths.users.authFacebook}/cb`, facebookMiddle.authenticateCallBack(), this.authOrCreate)
    this.api.get(Paths.users.authGoogle, googleMiddle.authenticate())
    this.api.get(`${Paths.users.authGoogle}/cb`, googleMiddle.authenticateCallBack(), this.authOrCreate)
  }

  public authOrCreate: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        if (req.user) {
          await this._userController.authOrCreate(req.user)
            .then(token => {
              res.setHeader('authorization', token)
              res.redirect(`${config.AGENT_CLIENT}/?t=${token}`)
            })
        }
      }, req, res
    })
}
