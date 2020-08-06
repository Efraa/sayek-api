import { BaseRoutes } from '../../infrastructure/http/BaseRoutes'
import {
  ResponseHandler,
  RouteMethod,
  statusCodes,
} from '../../infrastructure/http'
import { Response, RequestHandler, Request } from 'express'
import { NotificationController } from '../controllers/NotificationController'
import { validators } from '../utils/validators/NotificationValidators'
import { isAuthorized } from '../../infrastructure/middlewares/AuthorizedMiddle'
import { Endpoints } from './Endpoints'

export class NotificationRoutes extends BaseRoutes {
  constructor(
    modulePath: string,
    private _notificationController: NotificationController
  ) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    this.api.use(isAuthorized)
    // this.api.post(Endpoints.notifications.create, [isAuthorized, ...validators.create], this.create)
  }
}
