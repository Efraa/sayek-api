import { MapProp } from 'ts-simple-automapper'

export class UserDTO {
  @MapProp()
  id: number

  @MapProp()
  name: string

  @MapProp()
  email?: string

  @MapProp()
  networkType: string

  @MapProp()
  networkId: string

  @MapProp()
  tokenVersion: number
}
