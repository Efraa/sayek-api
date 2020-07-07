import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from '../BaseEntity'
import { lowercase, encode, capitalize } from '../transformers'

// Relations
import { Notification } from './Notification'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({
    transformer: [capitalize]
  })
  name: string

  @Column({
    transformer: [lowercase, encode],
    unique: true,
  })
  email: string

  @Column({
    transformer: [lowercase]
  })
  type: string

  @Column({
    transformer: [lowercase],
    nullable: true,
  })
  picture: string

  @Column({
    type: 'simple-json',
    nullable: true
  })
  data: object | null

  @OneToMany(type => Notification, n => n.userId,
    { onDelete: 'SET NULL' }
  )
  notifications: Notification[]
}
