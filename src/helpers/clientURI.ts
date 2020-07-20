import { config } from '../config'
import querystring from 'querystring'

const isEmpty = obj => Object.keys(obj).length === 0

export const clientURI = (pathname?: string, query?: {}) =>
  `${config.AGENT_CLIENT}${pathname ? pathname : ''}${
    isEmpty(query) ? '' : `/?${querystring.stringify(query)}`
  }`
