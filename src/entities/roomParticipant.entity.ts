import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Room } from './room.entity'
import { User } from './user.entity'

@Entity('room_participant')
export class RoomParticipant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'bool' })
  isOwner: boolean

  @Column({ type: 'integer' })
  score: number

  @Column({ type: 'integer' })
  userId: number

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ type: 'integer' })
  roomId: number

  @ManyToOne(() => Room, { nullable: false })
  @JoinColumn({ name: 'room_id' })
  room: Room
}
