import { Router } from 'express'
import { BaseRoutes } from './BaseRoutes'

// Modules
import { userModule } from '../app/modules/UserModule'
import { wallModule } from '../app/modules/WallModule'

// Routes
import { Paths } from '../app/routes/Paths'
import { UserRoutes } from '../app/routes/UserRoutes'
import { WallRoutes } from '../app/routes/WallRoutes'

export class Routes {
  static router: Router = Router()

  static add = (moduleRoutes: BaseRoutes) =>
    Routes.router.use(moduleRoutes.domain, moduleRoutes.routes)

  static build = () => {
    Routes.add(new UserRoutes(Paths.users.domain, userModule.controller))
    Routes.add(new WallRoutes(Paths.walls.domain, wallModule.controller))
  }
}
