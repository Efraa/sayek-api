import { Router } from 'express'
import { BaseRoutes } from './BaseRoutes'

// Modules
import { userModule } from '../app/modules/UserModule'

// Routes
import { UserRoutes } from '../app/routes/UserRoutes'

export class Routes {
  static router: Router = Router()

  static add = (moduleRoutes: BaseRoutes) =>
    Routes.router.use(moduleRoutes.domain, moduleRoutes.routes)

  static build = () => {
    Routes.add(new UserRoutes('/users', userModule.controller))
  }
}
