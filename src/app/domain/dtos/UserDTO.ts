import { MapProp } from 'ts-simple-automapper'

export class UserDTO {
  @MapProp()
  id: number

  @MapProp()
  email: string
}
