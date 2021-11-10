import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Room } from './room.entity'
import { User } from './user.entity'

@Entity('room_participant')
export class RoomParticipant extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
  
    @Column({ type: 'bool' })
    isOwner: boolean
  
    @Column({ type: 'integer'})
    score: number

    @Column({ type: 'integer'})
    @ManyToOne(() => User, {nullable: false})
    @JoinColumn({ name: 'user_id' })
    userId: number

    @Column({ type: 'integer'})
    @ManyToOne(() => Room, {nullable: false})
    @JoinColumn({ name: 'room_id' })
    roomId: number

    
}