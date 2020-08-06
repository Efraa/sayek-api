import { UserService } from '../services/UserService'
import { AuthToken } from '../../infrastructure/helpers'
import { clientURI } from '../../infrastructure/helpers/clientURI'
import { ErrorHandler, statusCodes } from '../../infrastructure/http'
import { UserMessages } from '../utils/messages/UserMessages'
import { User } from '../../database/entities/User'

export class UserController {
  constructor(private _userService: UserService) {}

  async authCallback(userPayload: any, state: string) {
    const userMapped = {
      name: userPayload.displayName,
      email: userPayload?.emails[0]?.value,
      networkType: userPayload.provider,
      networkId: userPayload.id,
      picture: userPayload?.photos[0]?.value,
      data: { ...userPayload['_json'] },
    }
    let user = await this._userService.getBySocialNetwork({
      networkId: userMapped.networkId,
      networkType: userMapped.networkType,
    })

    if (!user) {
      const userEntity = await this._userService.mapToEntity(userMapped)
      user = await this._userService.create(userEntity)
    }

    const { data } = await AuthToken.verifyRandomToken(state)
    return {
      callbackURI: clientURI(data.query?.continue),
      token: await AuthToken.generateRefreshToken(user),
    }
  }

  async refreshToken(token?: string) {
    if (!token)
      throw ErrorHandler.build(
        statusCodes.UNAUTHORIZED,
        UserMessages.AUTHORIZATION
      )

    const { user } = await AuthToken.verifyRefreshToken(token)
    const userLogged = await this._userService.getById(user.id)
    if (!user || !userLogged || userLogged?.tokenVersion !== user?.tokenVersion)
      throw ErrorHandler.build(
        statusCodes.FORBIDDEN,
        UserMessages.TOKEN_VERIFY_ERROR
      )

    return {
      token: await AuthToken.generateToken(userLogged),
      refreshToken: await AuthToken.generateRefreshToken(userLogged),
    }
  }

  async editUsername(userId: number, username: string) {
    const user = await this._userService.getById(userId, false)
    if (!user)
      throw ErrorHandler.build(statusCodes.BAD_REQUEST, UserMessages.NOT_FOUND)

    return this._userService.editUsername(user as User, username)
  }
}
