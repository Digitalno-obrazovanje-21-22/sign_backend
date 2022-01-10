import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { SignStats } from './signStats.entity'

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

  @OneToMany(() => SignStats, signStat => signStat.sign, { nullable: true, onDelete: 'CASCADE' })
  stats: SignStats[]
}
