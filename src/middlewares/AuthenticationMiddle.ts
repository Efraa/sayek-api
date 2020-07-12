import { Response, NextFunction, Request } from 'express'
import { ResponseHandler, statusCodes } from '../http'
import { JWToken } from '../helpers/JWToken'
import { Logger } from '../helpers/logging/Logger'

export const ensureAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get('authorization')
    const message = 'The request does not have the authorization headers.'
    if (!token) {
      Logger.info(message)
      return res
        .status(statusCodes.INTERNAL_ERROR)
        .send(ResponseHandler.build(message))
    }

    const isValidToken = await JWToken.verifyToken(token)
    if (isValidToken) {
      req.userLogged = isValidToken.user
      next()
    }
  } catch (e) {
    Logger.error(`[TOKEN ERROR]: ${e.name}, ${e.message}`)
    return res
      .status(statusCodes.UNAUTHORIZED)
      .send(ResponseHandler.build('An error occurred with the token verification.'))
  }
}
