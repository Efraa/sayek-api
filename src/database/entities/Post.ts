import { Entity, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { BaseEntity } from '../BaseEntity'
import { lowercase } from '../transformers'

// Relations
import { User } from './User'
import { Wall } from './Wall'
import { Comment } from './Comment'

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @Column({
    transformer: [lowercase]
  })
  content: string

  @Column({
    transformer: [lowercase]
  })
  color: string

  @Column()
  wallId: number

  @ManyToOne(type => Wall, wall => wall.posts, {
    cascade: ['update', 'insert']
  })
  @JoinColumn()
  wall: Wall

  @Column()
  userId: number

  @ManyToOne(type => User, {
    cascade: ['update', 'insert']
  })
  @JoinColumn()
  user: User

  @OneToMany(type => Comment, comment => comment.post,
    { onDelete: 'SET NULL' }
  )
  comments: Comment[]

  @ManyToMany(type => User)
  @JoinTable({ name: 'likes' })
  likes: User[]
}
