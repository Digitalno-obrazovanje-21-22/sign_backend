import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export type CreateSign = Omit<Sign, 'id'>

export type UpdateSign = Omit<Partial<Sign>, 'id'>

@Entity('sign')
export class Sign extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  videoUrl: string
}
