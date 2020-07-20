import { WallService } from '../services/WallService'
import { UserService } from '../services/UserService'
import { ErrorHandler, statusCodes } from '../../http'
import { WallMessages } from '../utils/messages/WallMessages'
import { WallDTO } from '../domain/dtos/WallDTO'
import { User } from '../../database/entities/User'

export class WallController {
  constructor(
    private _wallService: WallService,
    private _userService: UserService
  ) {}

  async create(wallPayload: { name: string; creatorId: number }) {
    const creator = await this._userService.getById(
      wallPayload.creatorId,
      false
    )
    if (!creator)
      throw ErrorHandler.build(
        statusCodes.BAD_REQUEST,
        WallMessages.CREATOR_NOT_FOUND
      )

    const wall = await this._wallService
      .mapToEntity({ ...wallPayload, creator })
      .then(async wall =>
        this._wallService.create({ ...wall, members: [creator as User] })
      )

    return { ...wall, members: undefined } as WallDTO
  }

  async leave(wallId: number, memberId: number) {
    const leave = await this._wallService.leave(wallId, memberId)
    if (!leave)
      throw ErrorHandler.build(
        statusCodes.BAD_REQUEST,
        WallMessages.UNJOIN_ERROR
      )

    return leave
  }

  async join(wallId: number, memberId: number) {
    const joined = await this._wallService.join(wallId, memberId)
    if (!joined)
      throw ErrorHandler.build(
        statusCodes.BAD_REQUEST,
        WallMessages.JOINED_ERROR
      )

    return joined
  }

  list = async (query: { page?: number; perPage?: number; userId: number }) =>
    this._wallService.list(query)

  get = async (wallId: number, userId?: number) =>
    this._wallService.get(wallId, userId)
}
