import { BaseRoutes } from '../../http/BaseRoutes'
import { ResponseHandler, RouteMethod, statusCodes } from '../../http'
import { Response, RequestHandler, Request } from 'express'
import { NotificationController } from '../controllers/NotificationController'
import { validators } from '../utils/validators/NotificationValidators'
import { ensureAuth } from '../../middlewares/AuthenticationMiddle'
import { Paths } from './Paths'


export class NotificationRoutes extends BaseRoutes {

  constructor(modulePath: string, private _notificationController: NotificationController) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    this.api.use(ensureAuth)
    // this.api.post(Paths.notifications.create, [ensureAuth, ...validators.create], this.create)
  }
}