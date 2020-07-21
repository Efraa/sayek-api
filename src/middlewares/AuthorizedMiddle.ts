import { Response, NextFunction, Request } from 'express'
import { ResponseHandler, statusCodes } from '../http'
import { AuthToken } from '../helpers/AuthToken'
import { Logger } from '../helpers/logging/Logger'
import { UserMessages } from '../app/utils/messages/UserMessages'

export const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      .send(ResponseHandler.build(UserMessages.TOKEN_VERIFY_ERROR))
  }
}

export const isLogged = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.get('authorization')
    if (token) {
      const { user } = await AuthToken.verifyToken(token)
      if (user) req.userLogged = user
    }

    return next()
  } catch (e) {
    Logger.error(`[TOKEN ERROR]: ${e.name}, ${e.message}`)
    return res
      .status(statusCodes.UNAUTHORIZED)
      .send(ResponseHandler.build(UserMessages.TOKEN_VERIFY_ERROR))
  }
}
