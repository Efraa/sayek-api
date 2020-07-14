import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, DeleteDateColumn } from 'typeorm'

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

  @DeleteDateColumn({
    name: 'deleted_at'
  })
  deletedAt: Date

  @VersionColumn()
  version: number
}