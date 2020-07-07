import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
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

  @Column({
    default: false
  })
  deleted: boolean

  @Column()
  creatorId: number

  @ManyToOne(type => User, {
    cascade: ['update', 'insert']
  })
  @JoinColumn()
  creator: User

  @OneToMany(type => Post, p => p.wallId,
    { onDelete: 'SET NULL' }
  )
  posts: Post[]
}
