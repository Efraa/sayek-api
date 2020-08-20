import { MapProp } from 'ts-simple-automapper'

export class PostDTO {
  @MapProp()
  id: number

  @MapProp()
  content: string

  @MapProp()
  color: string

  @MapProp()
  createAt: Date
}
