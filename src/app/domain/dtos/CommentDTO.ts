import { MapProp } from 'ts-simple-automapper'

export class CommentDTO {
  @MapProp()
  id: number

  @MapProp()
  content: string

  @MapProp()
  user: any
}
