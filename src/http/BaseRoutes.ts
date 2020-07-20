import { Router } from 'express'

export abstract class BaseRoutes {
  domain: string
  api: Router

  constructor(domain: string) {
    this.domain = domain
    this.api = Router()
  }

  get routes(): Router {
    return this.api
  }

  addRoutes(): void {
    throw new Error('This router must implements addRoutes().')
  }
}
