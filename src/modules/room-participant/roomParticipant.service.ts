import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoomParticipant } from 'src/entities/roomParticipant.entity'
import { Repository } from 'typeorm'
import { RoomParticipantCreationDto } from './RoomParticipant.dto'

@Injectable()
export class RoomParticipantService {
  constructor(@InjectRepository(RoomParticipant) private roomParticipantRepository: Repository<RoomParticipant>) {}

  findAll(): Promise<RoomParticipant[]> {
    return this.roomParticipantRepository.find({ relations: ['user', 'room'] })
  }

  findAllByRoomId(roomId: number): Promise<RoomParticipant[]> {
    return this.roomParticipantRepository.find({ where: { roomId: roomId }, relations: ['user', 'room'] })
  }

  findOne(roomId: number, userId: number): Promise<RoomParticipant> {
    return this.roomParticipantRepository.findOne({
      where: { roomId: roomId, userId: userId },
      relations: ['user', 'room'],
    })
  }

  joinRoom(roomParticipantCreationDto: Partial<RoomParticipantCreationDto>): Promise<RoomParticipant> {
    return this.roomParticipantRepository.save(roomParticipantCreationDto)
  }
}
