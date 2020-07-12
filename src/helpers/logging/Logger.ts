import { createLogger, transports, format as wFormat } from 'winston'
import { SlackHook } from './SlackHook'

const format = wFormat.combine(
  wFormat.simple(),
  wFormat.colorize(),
  wFormat.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  wFormat.printf(info => `[${info.timestamp}]: ${info.level.toUpperCase()} | ${info.message}`),
)

const defaultLogger = createLogger({
  format,
  transports: [
    SlackHook,
    new transports.Console(),
    new transports.File({
      maxsize: 5000000,
      maxFiles: 2,
      filename: 'logs/server.log'
    }),
  ]
})

export const Logger = {
  error: message => defaultLogger.error(message),
  info: message => defaultLogger.info(message),
}
