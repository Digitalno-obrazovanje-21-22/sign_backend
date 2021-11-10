import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('room')
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
  
    @Column({ type: 'text' })
    name: string
  
    @Column({ type: 'bool'})
    private: boolean

    @Column({ type: 'text'})
    code: string

    @Column({ type: 'boolean'})
    isOver: boolean

    @CreateDateColumn()
    createdAt: Date
  
    @UpdateDateColumn()
    updatedAt: Date
}