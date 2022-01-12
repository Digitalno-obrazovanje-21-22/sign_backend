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
          return Array.from(Array(10)).map(() => ({
            user: user,
            sign: signs[Math.floor(Math.random() * signs.length)],
            correct: Math.random() * 100 > 80,
          }))
        }),
      )
      .reduce((acc, val) => [...acc, ...val], [])
      .reduce((acc, val) => [...acc, ...val], [])
    return this.signStatsRepository.save(promiseArray)
  }

  //TODO: fix and simplify
  async getSignStatForParticularUser(userId: number) {
    // return this.signStatsRepository.find({where:{user: userId, sign: signId}});
    const signs = await this.signRepository.find({})
    const signStats = await this.signStatsRepository.createQueryBuilder('signStats').leftJoinAndSelect('signStats.sign', 'sign').getMany();
    const userStats = (await this.signStatsRepository.createQueryBuilder('signStats').leftJoinAndSelect('signStats.user', 'user').getMany()).filter(record => record.user.id == userId);

    //get signStats with user and sign data (for all signs and particular user)
    let userAndSignsStats = [];
    userStats.forEach((userStat) => signStats.forEach(signStat => {
      if (signStat.id == userStat.id) return (
        userAndSignsStats.push({
          user: userStat.user,
          sign: signStat.sign,
          id: userStat.id,
          correct: userStat.correct
        })
      )
    }
    ))

    //get array of percentages for all signs
    let signPercentages = [];
    let signStatsArray = []
    signs.forEach(sign => {
      signStatsArray = userAndSignsStats.filter(userAndSignStat => userAndSignStat.sign.id == sign.id);
      signPercentages.push({
        signId: sign.id,
        percentage: signStatsArray.filter(record =>  record.correct == true).length / signStatsArray.length
       })
    })

    return signPercentages;

  }
}
