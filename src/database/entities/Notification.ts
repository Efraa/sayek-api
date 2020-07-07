import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { BaseEntity } from '../BaseEntity'
import { lowercase, encode, capitalize } from '../transformers'

// Relations
import { User } from './User'

@Entity({ name: 'notifications' })
export class Notification extends BaseEntity {
  @Column({
    transformer: [capitalize]
  })
  title: string

  @Column({
    transformer: [capitalize]
  })
  body: string

  @Column({
    type: 'simple-json',
    nullable: true
  })
  data?: object | null

  @Column({
    default: false
  })
  read: boolean

  @Column({ transformer: [lowercase] })
  type: string

  @Column({
    name: 'entity_id'
  })
  entityId: number

  @Column({ transformer: [lowercase, encode] })
  action: string

  @Column({
    default: false
  })
  deleted: boolean

  @Column()
  userId: number

  @ManyToOne(type => User, {
    cascade: ['update', 'insert']
  })
  @JoinColumn()
  user: User
}
