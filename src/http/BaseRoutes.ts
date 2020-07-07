import { Router } from 'express'

export abstract class BaseRoutes {
  public domain: string
  public api: Router

  constructor(domain: string) {
    this.domain = domain
    this.api = Router()
  }

  public get routes(): Router {
    return this.api
  }

  addRoutes(): void {
    throw new Error('This router must implements addRoutes().')
  }
}
