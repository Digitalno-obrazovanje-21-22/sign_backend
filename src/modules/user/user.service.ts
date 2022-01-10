import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoomParticipant } from 'src/entities/roomParticipant.entity'
import { CreateUser, UpdateUser, User } from 'src/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(RoomParticipant)
    private roomParticipantRepository: Repository<RoomParticipant>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email: email } })
  }

  create(user: Partial<CreateUser>): Promise<Partial<User>> {
    return this.usersRepository.save(user)
  }

  async update(userId: number, user: UpdateUser): Promise<void> {
    await this.usersRepository.update(userId, user)
  }

  async remove(userId: number): Promise<void> {
    await this.usersRepository.delete(userId)
  }

  leaderboard(): Promise<User[]> {
    // return this.usersRepository.find({ join:  })
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roomParticipants', 'roomParticipants')
      .getMany()
  }
}
