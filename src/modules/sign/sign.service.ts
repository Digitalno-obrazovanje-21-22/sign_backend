import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { CreateSign, Sign, UpdateSign } from 'src/entities/sign.entity'

@Injectable()
export class SignService {
  constructor(
    @InjectRepository(Sign)
    private signRepository: Repository<Sign>,
  ) {}
  findAll(): Promise<Sign[]> {
    return this.signRepository.find()
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
}
