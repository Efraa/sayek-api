import { UserService } from '../services/UserService'
import { SocketServer } from '../../socket/SocketServer'
import { JWToken } from '../../helpers'

export class UserController {
  constructor(
    private _userService: UserService,
    private _socket: SocketServer,
  ) {}

  async authOrCreate(userPayload: any) {
    const userMapped = {
      name: userPayload.displayName,
      email: userPayload?.emails[0]?.value,
      networkType: userPayload.provider,
      networkId: userPayload.id,
      picture: userPayload?.photos[0]?.value,
      data: { ...userPayload['_json'] }
    }
    let user = await this._userService.getBySocialNetwork({
      networkId: userMapped.networkId,
      networkType: userMapped.networkType
    })
    console.log('User from EFRA:', user)

    if (!user) {
      // create user
      const userEntity = await this._userService.mapToEntity(userMapped)
      user = await this._userService.create(userEntity)
    }

    return await JWToken.generateToken(user)
  }
}
