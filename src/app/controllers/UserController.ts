import { UserService } from '../services/UserService'
import { SocketServer } from '../../socket/SocketServer'

export class UserController {
  constructor(
    private _userService: UserService,
    private _socket: SocketServer,
  ) {}

  public async create(userPayload?: UserPayload) {
    return { msg: 'test' }
  }
}
