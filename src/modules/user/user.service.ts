import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUser, UpdateUser, User } from 'src/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
}
