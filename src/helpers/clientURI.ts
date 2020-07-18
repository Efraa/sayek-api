import { config } from '../config'
import querystring from 'querystring'

export const clientURI = (pathname: string, query?: {}) =>
  `${config.AGENT_CLIENT}${pathname}${query ? `/?${querystring.stringify(query)}` : ''}`
