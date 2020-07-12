import 'reflect-metadata'
import dotenv from 'dotenv'
import { DatabaseConnection } from './database/DatabaseConnection'
import { cors, security } from './helpers/appSecurity'
import express, { Application } from 'express'
import compression from 'compression'
import { passport } from './middlewares/passport'
import { Routes } from './http'
import morgan from 'morgan'
dotenv.config()

const app: Application = express()

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.set('port', process.env.PORT)
app.use(passport.initialize())
app.use(express.json())
app.use(compression())
app.use(morgan('dev'))
app.use(security())
app.use(cors())

const initializeApplication = async () => {
  try {
    await DatabaseConnection.connect()
      .then(({ options: { database } }) =>
        console.info(`Connected to ${database} database`))
    
    Routes.build()
    app.use(process.env.PREFIX_ROUTES as string, Routes.router)
  } catch (e) {
    console.error(e)
  }
}

export { app, initializeApplication }
