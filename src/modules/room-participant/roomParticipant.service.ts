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

  async joinRoom(roomParticipantCreationDto: Partial<RoomParticipantCreationDto>): Promise<RoomParticipant> {
    const existingParticipants = await this.roomParticipantRepository.find({where: {roomId: roomParticipantCreationDto.roomId }});
    if(( existingParticipants).find((p) => p.userId === roomParticipantCreationDto.userId)){
      return existingParticipants.find((p) => p.userId === roomParticipantCreationDto.userId)
    }
    return this.roomParticipantRepository.save(roomParticipantCreationDto)
  }
}
