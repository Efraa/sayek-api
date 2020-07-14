import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { BaseEntity } from '../BaseEntity'
import { lowercase } from '../transformers'

// Relations
import { User } from './User'
import { Post } from './Post'

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
  @Column({
    transformer: [lowercase]
  })
  content: string

  @Column()
  userId: number

  @ManyToOne(type => User, {
    cascade: ['update', 'insert']
  })
  @JoinColumn()
  user: User

  @Column()
  postId: number

  @ManyToOne(type => Post, {
    cascade: ['update', 'insert']
  })
  @JoinColumn()
  post: Post
}
