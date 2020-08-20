import { MapProp } from 'ts-simple-automapper'

export class WallDTO {
  @MapProp()
  id: number

  @MapProp()
  name: string

  @MapProp()
  posts: any[]
}
