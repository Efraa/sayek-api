import { BaseRoutes } from '../../http/BaseRoutes'
import { ResponseHandler, RouteMethod, statusCodes } from '../../http'
import { Response, RequestHandler, Request } from 'express'
import { UserController } from '../controllers/UserController'

export class UserRoutes extends BaseRoutes {

  constructor(modulePath: string, private _userController: UserController) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    this.api.post('/test', this.test)
  }

  public test: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        // const userLogged = await this._UserController.userLoggedWithAccountInfo(req.user.id)
        // if (userLogged)
        return res
          .status(statusCodes.OK)
          .send(ResponseHandler.build({ msg: 'test from user' }, false))
      }, req, res
    })
}
