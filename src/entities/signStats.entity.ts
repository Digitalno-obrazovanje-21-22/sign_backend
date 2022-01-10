import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Sign } from './sign.entity'
import { User } from './user.entity'

@Entity('singStats')
export class SignStats extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Sign, sign => sign.stats, { nullable: false })
  sign: Sign

  @ManyToOne(() => User, user => user.stats, { nullable: false })
  user: User

  @Column({ type: 'bool' })
  correct: boolean
}
