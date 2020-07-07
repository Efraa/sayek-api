import { UserService } from '../services/UserService'
import { UserSocket } from '../sockets/UserSocket'

export class UserController {
  constructor(
    private _userService: UserService,
    private _userSocket: UserSocket,
  ) {}

  public async create(userPayload: UserPayload) {
    return []
  }
}
