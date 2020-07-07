import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({
    name: 'create_at'
  })
  createAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date

  @VersionColumn()
  version: number
}