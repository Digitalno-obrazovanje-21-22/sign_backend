import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { CreateSign, Sign, UpdateSign } from 'src/entities/sign.entity'
import { SignStats } from 'src/entities/signStats.entity'
import { User } from 'src/entities/user.entity'

@Injectable()
export class SignService {
  constructor(
    @InjectRepository(Sign)
    private signRepository: Repository<Sign>,
    @InjectRepository(SignStats)
    private signStatsRepository: Repository<SignStats>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  findAll(): Promise<Sign[]> {
    return this.signRepository.createQueryBuilder('sign').leftJoinAndSelect('sign.stats', 'signStats').getMany()
  }

  findOne(id: number): Promise<Sign> {
    return this.signRepository.findOne(id)
  }

  create(sign: Partial<CreateSign>): Promise<Sign> {
    return this.signRepository.save(sign)
  }

  update(signId: number, sign: UpdateSign) {
    return this.signRepository.update(signId, sign)
  }

  remove(signId: number) {
    return this.signRepository.delete(signId)
  }

  async populateRandomStats() {
    const signs = await this.signRepository.find({})
    const users = await this.userRepository.find({})
    let promiseArray: any[] = Array.from(Array(100))
      .map(() =>
        users.map(user => {
          const randomizerDifficulty = Math.round(Math.random() * 60)
          return Array.from(Array(10)).map(() => ({
            user: user,
            sign: signs[Math.floor(Math.random() * signs.length)],
            correct: Math.random() * 100 > randomizerDifficulty,
          }))
        }),
      )
      .reduce((acc, val) => [...acc, ...val], [])
      .reduce((acc, val) => [...acc, ...val], [])
    return this.signStatsRepository.save(promiseArray)
  }

  //TODO: fix and simplify
  async getSignStatForParticularUser(userId: number) {
    const userSignStats = await this.signStatsRepository.find({ where: { user: userId }, relations: ['sign'] })
    return Object.entries(
      userSignStats.reduce((acc: any, val: SignStats) => {
        if (acc[val.sign.id] == null) {
          acc[val.sign.id] = { correct: val.correct ? 1 : 0, total: 1 }
        } else {
          acc[val.sign.id].correct += val.correct ? 1 : 0
          acc[val.sign.id].total++
        }
        return acc
      }, {}),
    ).map(([key, value]: any) => ({ signId: key, percentage: ((value.correct * 100) / value.total).toFixed(2) }))
  }
}
