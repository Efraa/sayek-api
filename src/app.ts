import 'reflect-metadata'
import { DatabaseConnection } from './database/DatabaseConnection'
import express, { Application } from 'express'
import compression from 'compression'
import { Routes } from './http'
import morgan from 'morgan'
import cors from 'cors'

const app: Application = express()

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.set('port', process.env.PORT)
app.use(express.json())
app.use(compression())
app.use(cors())
app.use(morgan('dev'))

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
