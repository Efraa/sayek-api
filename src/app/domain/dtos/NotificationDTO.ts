import { MapProp } from 'ts-simple-automapper'

export class NotificationDTO {
  @MapProp()
  id?: number

  @MapProp()
  title?: string

  @MapProp()
  body?: string

  @MapProp()
  data?: any | null

  @MapProp()
  read?: boolean

  @MapProp()
  type?: string

  @MapProp()
  action?: string

  @MapProp()
  userId?: number

  @MapProp()
  entityId?: number

  @MapProp()
  createAt?: Date
}
