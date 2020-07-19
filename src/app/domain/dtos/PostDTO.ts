import { MapProp } from 'ts-simple-automapper'

export class PostDTO {
  @MapProp()
  id: number

  @MapProp()
  content: string

  @MapProp()
  userId: number

  @MapProp()
  user: any

  @MapProp()
  createAt: Date

  @MapProp()
  color: string

  @MapProp()
  comments: any

  @MapProp()
  commentsCount?: string

  @MapProp()
  likes: any

  @MapProp()
  likesCount?: string

  @MapProp()
  isLiked?: boolean
}
