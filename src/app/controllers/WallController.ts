import { WallService } from '../services/WallService'
import { SocketServer } from '../../socket/SocketServer'
import { UserService } from '../services/UserService'
import { ErrorHandler, statusCodes } from '../../http'
import { WallMessages } from '../utils/messages/WallMessages'

export class WallController {
  constructor(
    private _wallService: WallService,
    private _userService: UserService,
    private _socket: SocketServer,
  ) {}

  async create(wallPayload: {
    name: string,
    creatorId: number,
  }) {
    const creator = await this._userService.getById(wallPayload.creatorId)
    if (!creator)
      throw ErrorHandler.build(statusCodes.BAD_REQUEST, WallMessages.CREATOR_NOT_FOUND)

    const wall = await this._wallService.mapToEntity({ ...wallPayload, creator })
      .then(async wall => await this._wallService.create({ ...wall, members: [creator] }))

    return wall
  }
}
