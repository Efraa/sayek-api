import { Router } from 'express'
import { BaseRoutes } from './BaseRoutes'

// Modules
import { userModule } from '../app/modules/UserModule'
import { wallModule } from '../app/modules/WallModule'
import { postModule } from '../app/modules/PostModule'
import { commentModule } from '../app/modules/CommentModule'
import { notificationModule } from '../app/modules/NotificationModule'

// Routes
import { Endpoints } from '../app/routes/Endpoints'
import { UserRoutes } from '../app/routes/UserRoutes'
import { WallRoutes } from '../app/routes/WallRoutes'
import { PostRoutes } from '../app/routes/PostRoutes'
import { CommentRoutes } from '../app/routes/CommentRoutes'
import { NotificationRoutes } from '../app/routes/NotificationRoutes'

export class Routes {
  static router: Router = Router()

  static add = (moduleRoutes: BaseRoutes) =>
    Routes.router.use(moduleRoutes.domain, moduleRoutes.routes)

  static build = () => {
    Routes.add(new UserRoutes(Endpoints.users.domain, userModule.controller))
    Routes.add(new WallRoutes(Endpoints.walls.domain, wallModule.controller))
    Routes.add(new PostRoutes(Endpoints.posts.domain, postModule.controller))
    Routes.add(
      new CommentRoutes(Endpoints.comments.domain, commentModule.controller)
    )
    Routes.add(
      new NotificationRoutes(
        Endpoints.notifications.domain,
        notificationModule.controller
      )
    )
  }
}
