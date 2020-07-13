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

  async unjoin(wallId: number, memberId: number) {
    const unjoined = await this._wallService.unjoin(wallId, memberId)
    if (!unjoined)
      throw ErrorHandler.build(statusCodes.BAD_REQUEST, WallMessages.UNJOIN_ERROR)
    
    return unjoined
  }

  async join(wallId: number, memberId: number) {
    const joined = await this._wallService.join(wallId, memberId)
    if (!joined)
      throw ErrorHandler.build(statusCodes.BAD_REQUEST, WallMessages.JOINED_ERROR)
    
    return joined
  }

  list = async (query: {
    page?: number,
    perPage?: number,
    userId: number,
  }) => await this._wallService.list(query)

  // async get(wallId: number, memberId: number) {
  //   const memberIsJoined = await this._wallService.memberIsJoined(wallId, memberId)
  //   if (!memberIsJoined)
  //     throw ErrorHandler.build(statusCodes.BAD_REQUEST, WallMessages.NOT_A_MEMBER)
    
  //   const wall = await this._userService.get()

  //   return wall
  // }
}
