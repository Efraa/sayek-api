import 'reflect-metadata'
import { config } from './config'
import { DatabaseConnection } from './database/DatabaseConnection'
import { cors, security, sanitizeData, securityHeaders } from './helpers/appSecurity'
import express, { Application } from 'express'
import compression from 'compression'
import { passport } from './middlewares/passport'
import { Routes } from './http'
import morgan from 'morgan'

const app: Application = express()

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.set('port', config.SERVER.PORT)
app.use(passport.initialize())
app.use(express.json())
app.use(compression())
app.use(morgan('dev'))
app.use(security())
app.use(securityHeaders())
app.use(sanitizeData())
app.use(cors())

const initializeApplication = async () => {
  try {
    await DatabaseConnection.connect()
      .then(({ options: { database } }) =>
        console.info(`Connected to ${database} database`))
    
    Routes.build()
    app.use(config.SERVER.PREFIX_ROUTES, Routes.router)
  } catch (e) {
    console.error(e)
  }
}

export { app, initializeApplication }
