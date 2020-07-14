import { Entity, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { BaseEntity } from '../BaseEntity'
import { capitalize } from '../transformers'

// Relations
import { User } from './User'
import { Post } from './Post'

@Entity({ name: 'walls' })
export class Wall extends BaseEntity {
  @Column({
    transformer: [capitalize]
  })
  name: string

  @Column()
  creatorId: number

  @ManyToOne(type => User, {
    cascade: ['update', 'insert']
  })
  @JoinColumn()
  creator: User

  @OneToMany(type => Post, post => post.wall,
    { onDelete: 'SET NULL' }
  )
  posts: Post[]

  @ManyToMany(type => User)
  @JoinTable({ name: 'walls_user_joins' })
  members: User[]
}
