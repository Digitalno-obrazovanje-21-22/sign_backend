import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { RoomParticipant } from './roomParticipant.entity'
import { SignStats } from './signStats.entity'

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

  @OneToMany(() => RoomParticipant, roomParticipant => roomParticipant.user, { nullable: true, onDelete: 'CASCADE' })
  roomParticipants: RoomParticipant[]

  @OneToMany(() => SignStats, signStats => signStats.user, { nullable: true, onDelete: 'CASCADE' })
  stats: SignStats[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ type: 'integer', nullable: true })
  score?: number
}
