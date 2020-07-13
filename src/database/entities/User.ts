import { Entity, Column, Index } from 'typeorm'
import { BaseEntity } from '../BaseEntity'
import { lowercase, encode, capitalize } from '../transformers'

@Entity({ name: 'users' })
@Index('user_social_network', ['networkType', 'networkId'], { unique: true })
export class User extends BaseEntity {
  @Column({
    transformer: [capitalize]
  })
  name: string

  @Column({
    transformer: [lowercase, encode],
    nullable: true,
  })
  email?: string

  @Column({
    transformer: [lowercase],
    name: 'social_network_type'
  })
  networkType: string

  @Column({
    name: 'social_network_id'
  })
  networkId: string

  @Column({
    type: 'simple-json',
    nullable: true
  })
  data: object | null
}
