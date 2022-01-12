import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoomParticipant } from 'src/entities/roomParticipant.entity'
import { User } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { RoomParticipantCreationDto, RoomParticipantDto } from './RoomParticipant.dto'

@Injectable()
export class RoomParticipantService {
  constructor(@InjectRepository(RoomParticipant) private roomParticipantRepository: Repository<RoomParticipant>,@InjectRepository(User) private usersRepository: Repository<User>) {}

  findAll(): Promise<RoomParticipant[]> {
    return this.roomParticipantRepository.find({ relations: ['user', 'room'] })
  }

  findAllByRoomId(roomId: number): Promise<RoomParticipant[]> {
    return this.roomParticipantRepository.find({
      where: { roomId: roomId },
      relations: ['user', 'room'],
      order: { userId: 'ASC' },
    })
  }

  findOneByRoomIdAndUserId(roomId: number, userId: number): Promise<RoomParticipant> {
    return this.roomParticipantRepository.findOne({
      where: { roomId: roomId, userId: userId },
      relations: ['user', 'room'],
    })
  }

  findOneById(roomParticipantId: number): Promise<RoomParticipant> {
    return this.roomParticipantRepository.findOne({
      where: { id: roomParticipantId },
      relations: ['user', 'room'],
    })
  }

  async joinRoom(roomParticipantCreationDto: Partial<RoomParticipantCreationDto>): Promise<RoomParticipant> {
    const existingParticipants = await this.roomParticipantRepository.find({
      where: { roomId: roomParticipantCreationDto.roomId },
    })
    if (existingParticipants.find(p => p.userId === roomParticipantCreationDto.userId)) {
      return existingParticipants.find(p => p.userId === roomParticipantCreationDto.userId)
    }
    return this.roomParticipantRepository.save(roomParticipantCreationDto)
  }

  async deleteById(roomParticipantId: number) {
    return this.roomParticipantRepository.delete(roomParticipantId)
  }

  async deleteByRoomIdAndUserId(roomId: number, userId: number) {
    return this.roomParticipantRepository.delete({ roomId, userId })
  }

  async leaveRoom(userId, roomId) {
    return this.roomParticipantRepository.delete({ userId, roomId })
  }

  async updateScore(roomParticipantId:number, data: RoomParticipantDto){
    //update roomParticipant score
    await this.roomParticipantRepository.update(roomParticipantId, data);
    
    //update overall user score from all games
    const roomParticipant: RoomParticipant = await this.roomParticipantRepository.findOne(roomParticipantId);
    await this.sumOverallUserScore(roomParticipant.userId);
  }

  async sumOverallUserScore(userId: number){
    const allUserParticipations = await this.roomParticipantRepository.find({where: { userId: userId }});
    let overallScore = 0;
    allUserParticipations.forEach(roomParticipant => {
        overallScore += roomParticipant.score;
    })
    let user: User = await this.usersRepository.findOne(userId);
    user.score = overallScore;
    await this.usersRepository.update(userId, user);
  }
}
