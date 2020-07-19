import { Response, NextFunction, Request } from 'express'
import { ResponseHandler, statusCodes } from '../http'
import { AuthToken } from '../helpers/AuthToken'
import { Logger } from '../helpers/logging/Logger'

export const publicAuth = async (req: Request, res: Response, next: NextFunction) => {
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
      .send(ResponseHandler.build('An error occurred with the token verification.'))
  }
}
