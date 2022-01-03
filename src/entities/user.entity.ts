import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export type CreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateUser = Omit<Partial<User>, 'id' | 'createdAt' | 'updatedAt'>

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  firstName: string

  @Column({ type: 'text' })
  lastName: string

  @Column({ type: 'text' })
  email: string

  @Column({ type: 'text' })
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ type: 'integer' })
  score: number
}
