import { Response, NextFunction, Request } from 'express'
import { ResponseHandler, statusCodes } from '../http'
import { AuthToken } from '../helpers/AuthToken'
import { Logger } from '../helpers/logging/Logger'
import { UserMessages } from '../app/utils/messages/UserMessages'

export const ensureAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get('authorization')
    const message = UserMessages.AUTHORIZATION
    if (!token) {
      Logger.info(message)
      return res
        .status(statusCodes.INTERNAL_ERROR)
        .send(ResponseHandler.build(message))
    }

    const { user } = await AuthToken.verifyToken(token)
    if (user) {
      req.userLogged = user
      next()
    }
  } catch (e) {
    Logger.error(`[TOKEN ERROR]: ${e.name}, ${e.message}`)
    return res
      .status(statusCodes.UNAUTHORIZED)
      .send(ResponseHandler.build('An error occurred with the token verification.'))
  }
}
