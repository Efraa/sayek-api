import c from 'cors'
import lusca from 'lusca'
import xss from 'xss-clean'
import helmet from 'helmet'

const corsOptions : c.CorsOptions = {
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
}

const securityOptions = {
  xframe: 'SAMEORIGIN',
  xssProtection: true,
}

export const cors = () => c(corsOptions)
export const security = () => lusca(securityOptions)
export const securityHeaders = () => helmet()
export const sanitizeData = () => xss()
