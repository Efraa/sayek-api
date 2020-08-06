import 'reflect-metadata'
import { config } from './config'
import { DatabaseConnection } from './database/DatabaseConnection'
import {
  cors,
  security,
  securityHeaders,
} from './infrastructure/helpers/appSecurity'
import express, { Application } from 'express'
import compression from 'compression'
import { passport } from './infrastructure/middlewares/passport'
import { Routes } from './infrastructure/http'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

const app: Application = express()

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.set('port', config.SERVER.PORT)
app.use(passport.initialize())
app.use(express.json())
app.use(cookieParser())
app.use(compression())
app.use(morgan('dev'))
app.use(security())
app.use(securityHeaders())
app.use(cors())
app.get('/', (req, res) => res.redirect(config.AGENT_CLIENT as string))

const initializeApplication = async () => {
  try {
    await DatabaseConnection.connect().then(({ options: { database } }) =>
      console.info(`Connected to ${database} database`)
    )

    Routes.build()
    app.use(config.SERVER.PREFIX_ROUTES, Routes.router)
  } catch (e) {
    console.error(e)
  }
}

export { app, initializeApplication }
