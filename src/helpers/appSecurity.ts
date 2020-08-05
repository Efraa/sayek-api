import { config } from '../config'
import c from 'cors'
import lusca from 'lusca'
import xss from 'sanitize-html'
import helmet from 'helmet'

const corsOptions: c.CorsOptions = {
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Origin',
    'X-Requested-With',
    'Accept',
    'x-xsrf-token',
  ],
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
  origin: config.AGENT_CLIENT,
}

const securityOptions = {
  xframe: 'SAMEORIGIN',
  xssProtection: true,
}

export const cors = () => c(corsOptions)
export const security = () => lusca(securityOptions)
export const securityHeaders = () => helmet()
export const sanitizeData = (data: string | any) =>
  xss(data, {
    allowedTags: ['b', 'i', 'br', 'div'],
    allowedAttributes: {
      a: ['href'],
    },
  })
