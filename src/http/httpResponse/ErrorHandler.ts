import { Logger } from '../../app/helpers/logging/Logger'

const build = (statusCode: number, message: string | string[]) => {
  Logger.info(message)
  return {
    statusCode,
    message,
  }
}

export const ErrorHandler = {
  build
}
